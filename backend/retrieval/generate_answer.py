import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from retrieval.prompt_builder import build_multimodal_prompt

def generate_final_answer(chunks, query: str):
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

    prompt_text = build_multimodal_prompt(chunks, query)

    message_content = [{"type": "text", "text": prompt_text}]

    # Attach images (optional, safe)
    for chunk in chunks:
        if "original_content" in chunk.metadata:
            data = json.loads(chunk.metadata["original_content"])
            for img in data.get("images_base64", []):
                message_content.append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{img}"}
                })

    response = llm.invoke([HumanMessage(content=message_content)])
    return response.content
