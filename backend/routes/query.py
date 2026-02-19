from fastapi import APIRouter
from retrieval.retrieve_chunks import retrieve_chunks
from retrieval.generate_answer import generate_final_answer

router = APIRouter(prefix="/query", tags=["Query"])

@router.post("")
async def ask_question(question: str):
    # 1. Retrieve relevant chunks
    chunks = retrieve_chunks(question, k=3)

    # 2. Generate final answer
    answer = generate_final_answer(
        chunks=chunks,
        query=question
    )

    return {
        "question": question,
        "answer": answer
    }
