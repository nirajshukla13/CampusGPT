from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import asyncio
from typing import Optional
from retrieval.retrieve_chunks import retrieve_chunks
from retrieval.generate_answer import generate_final_answer
from utils import require_role
from database import get_database
from datetime import datetime

from utils.diagram_decision_service import DiagramDecisionService
from utils.diagram_service import DiagramService

router = APIRouter(prefix="/query", tags=["Query"])

decision_service = DiagramDecisionService()
diagram_service = DiagramService()

@router.post("")
async def ask_question(question: str):

    # 🔥 STEP 1: Decide if diagram needed
    decision = decision_service.decide(question)

    needs_diagram = decision.get("needs_diagram", False)
    diagram_query = decision.get("diagram_query", "")

    diagram_data = None

    # 🔥 STEP 2: Generate diagram safely
    if needs_diagram:
        try:
            diagram_result = diagram_service.generate_diagram(diagram_query)

            if diagram_result.get("success"):
                diagram_data = {
                    "explanation": diagram_result["explanation"],
                    "diagram": diagram_result["diagram"]
                }

        except Exception as e:
            # ❗ DO NOT BREAK MAIN FLOW
            print(f"[Diagram Error] {str(e)}")
            diagram_data = None

    # 🔥 STEP 3: Normal RAG flow (always runs)
    chunks = retrieve_chunks(question, k=3)

    answer = generate_final_answer(
        chunks=chunks,
        query=question
    )

    # 🔥 STEP 4: Final response
    return {
        "question": question,
        "answer": answer,
        "diagram": diagram_data
    }
class QueryRequest(BaseModel):
    question: str
    stream: Optional[bool] = False

@router.post("")
async def ask_question(
    request: QueryRequest,
    current_user: dict = Depends(require_role(["student", "faculty", "admin"]))
):
    """
    Handle query requests with optional streaming.
    If stream=True, returns Server-Sent Events.
    Otherwise returns a complete response.
    """
    question = request.question
    
    # 1. Retrieve relevant chunks
    chunks = retrieve_chunks(question, k=3)
    
    # Extract sources from chunks
    sources = []
    for i, chunk in enumerate(chunks):
        metadata = chunk.metadata
        sources.append({
            "id": i + 1,
            "name": metadata.get("source", "Unknown"),
            "page": metadata.get("page", 1),
            "label": metadata.get("type", "PDF"),
            "timestamp": metadata.get("timestamp", "00:00:00")
        })
    
    if request.stream:
        # Use Server-Sent Events for streaming
        async def event_generator():
            try:
                # Send sources first
                yield f"data: {json.dumps({'type': 'sources', 'data': sources})}\n\n"
                await asyncio.sleep(0.1)
                
                # Generate answer (currently non-streaming, but we'll simulate streaming)
                answer = generate_final_answer(chunks=chunks, query=question)
                
                # Stream the answer word by word
                words = answer.split()
                for i, word in enumerate(words):
                    chunk_data = {
                        "type": "chunk",
                        "data": word + (" " if i < len(words) - 1 else "")
                    }
                    yield f"data: {json.dumps(chunk_data)}\n\n"
                    await asyncio.sleep(0.02)  # Small delay for streaming effect
                
                # Send completion signal
                yield f"data: {json.dumps({'type': 'done'})}\n\n"
                
                # Save to history
                try:
                    db = await get_database()
                    await db.query_history.insert_one({
                        "user_id": current_user.get("user_id"),
                        "email": current_user.get("email"),
                        "question": question,
                        "answer": answer,
                        "sources": sources,
                        "timestamp": datetime.utcnow()
                    })
                except Exception as e:
                    print(f"Error saving history: {e}")
                    
            except Exception as e:
                yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
        
        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
    else:
        # Return complete response
        answer = generate_final_answer(chunks=chunks, query=question)
        
        # Save to history
        try:
            db = await get_database()
            await db.query_history.insert_one({
                "user_id": current_user.get("user_id"),
                "email": current_user.get("email"),
                "question": question,
                "answer": answer,
                "sources": sources,
                "timestamp": datetime.utcnow()
            })
        except Exception as e:
            print(f"Error saving history: {e}")
        
        return {
            "question": question,
            "answer": answer,
            "sources": sources
        }
