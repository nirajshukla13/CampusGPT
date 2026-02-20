from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

from retrieval.prompt_builder import build_structured_prompt
from schemas.structured_output import StructuredRAGAnswer


def generate_final_answer(
    chunks,
    query: str,
    conversation_context: str = ""
) -> StructuredRAGAnswer:

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0
    )

    structured_llm = llm.with_structured_output(StructuredRAGAnswer)

    prompt_text = build_structured_prompt(
        chunks=chunks,
        query=query,
        conversation_context=conversation_context
    )

    response: StructuredRAGAnswer = structured_llm.invoke(
        [HumanMessage(content=prompt_text)]
    )

    return response
