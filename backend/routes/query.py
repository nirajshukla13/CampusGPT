from fastapi import APIRouter, Depends
from pydantic import BaseModel
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
    session_id: str

@router.post("")
async def ask_question(
    request: QueryRequest,
    current_user: dict = Depends(require_role(["student", "faculty", "admin"]))
):
    try:
        print(request)
        question = request.question
        conversation_id = request.session_id

        db = await get_database()

        previous_messages = await db.query_history.find(
            {
                "conversation_id": conversation_id,
                "email": current_user.get("email")
            }
        ).sort("timestamp", 1).limit(5).to_list(5)

        conversation_context = ""
        for item in previous_messages:
            conversation_context += f"User: {item['question']}\n"
            conversation_context += f"Assistant: {item['answer']}\n"

        chunks = retrieve_chunks(question, k=3)

        final_answer = generate_final_answer(
            chunks=chunks,
            query=question,
            conversation_context=conversation_context
        )

        decision = decision_service.decide(question)
        needs_diagram = decision.get("needs_diagram", False)
        diagram_response = None

        if needs_diagram:
            try:
                diagram_data = diagram_service.generate_diagram(
                    decision.get("diagram_query", ""),
                    chunks
                )
                if diagram_data and diagram_data.get("success"):
                    diagram_response = {
                        "explanation": diagram_data["explanation"],
                        "diagram": diagram_data["diagram"]
                    }
            except Exception as e:
                print(f"[Diagram Error] {e}")

        await db.query_history.insert_one({
            "conversation_id": conversation_id,
            "user_id": current_user.get("user_id"),
            "email": current_user.get("email"),
            "question": question,
            "answer": final_answer.answer,
            "sources": [c.model_dump() for c in final_answer.citations],
            "diagram": diagram_response,
            "timestamp": datetime.utcnow()
        })
        print(final_answer)
        return {
            "answer": final_answer.model_dump() if final_answer else {},
            "diagram": diagram_response
        }

    except Exception as e:
        return {
            "answer": "",
            "citations": [],
            "diagram": None,
            "error": str(e)
        }