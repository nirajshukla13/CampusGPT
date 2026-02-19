from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import asyncio
from typing import Optional
from datetime import datetime

from retrieval.retrieve_chunks import retrieve_chunks
from retrieval.generate_answer import generate_final_answer
from utils import require_role
from database import get_database

from utils.diagram_decision_service import DiagramDecisionService
from utils.diagram_service import DiagramService

router = APIRouter(prefix="/query", tags=["Query"])

decision_service = DiagramDecisionService()
diagram_service = DiagramService()


class QueryRequest(BaseModel):
    question: str
    stream: Optional[bool] = False


@router.post("")
async def ask_question(
    request: QueryRequest,
    current_user: dict = Depends(require_role(["student", "faculty", "admin"]))
):
    question = request.question

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
            print(f"[Diagram Error] {str(e)}")
    

    # 🔥 STEP 3: Retrieve chunks
    chunks = retrieve_chunks(question, k=3)

    # Extract sources
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

    # 🔥 STREAM MODE
    if request.stream:

        async def event_generator():
            try:
                # Send sources
                yield f"data: {json.dumps({'type': 'sources', 'data': sources})}\n\n"
                await asyncio.sleep(0.1)

                # Generate answer
                answer = generate_final_answer(chunks=chunks, query=question)

                # Stream answer
                words = answer.split()
                for i, word in enumerate(words):
                    yield f"data: {json.dumps({'type': 'chunk', 'data': word + (' ' if i < len(words)-1 else '')})}\n\n"
                    await asyncio.sleep(0.02)

                # 🔥 Send diagram at end
                if diagram_data:
                    yield f"data: {json.dumps({'type': 'diagram', 'data': diagram_data})}\n\n"

                yield f"data: {json.dumps({'type': 'done'})}\n\n"

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

    # 🔥 NON-STREAM MODE
    else:
        answer = generate_final_answer(chunks=chunks, query=question)

        # Save history
        try:
            db = await get_database()
            await db.query_history.insert_one({
                "user_id": current_user.get("user_id"),
                "email": current_user.get("email"),
                "question": question,
                "answer": answer,
                "sources": sources,
                "diagram": diagram_data,
                "timestamp": datetime.utcnow()
            })
        except Exception as e:
            print(f"Error saving history: {e}")

        return {
            "question": question,
            "answer": answer,
            "sources": sources,
            "diagram": diagram_data
        }
