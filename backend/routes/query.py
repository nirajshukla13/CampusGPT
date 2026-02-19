from fastapi import APIRouter
from retrieval.retrieve_chunks import retrieve_chunks
from retrieval.generate_answer import generate_final_answer

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
