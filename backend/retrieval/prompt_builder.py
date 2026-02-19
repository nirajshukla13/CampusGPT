def build_structured_prompt(chunks, query: str):
    prompt = f"""
You are a retrieval-augmented question answering system.

STRICT RULES:
- Use ONLY the provided document excerpts.
- Citations represent SOURCE CHUNKS, not individual sentences.
- Use AT MOST ONE citation per chunk.
- Do NOT duplicate citations from the same document_id + chunk_index.
- Every citation must correspond to a chunk explicitly listed below.
- If numerical values (MAE, RMSE, accuracy, %, years) appear, include them.
- Output MUST strictly follow the given schema.
- Output ONLY valid JSON. No explanations.

QUESTION:
{query}

DOCUMENT EXCERPTS:
"""

    for i, chunk in enumerate(chunks, start=1):
        prompt += f"""
--- CHUNK {i} ---
document_name: {chunk.metadata.get("document_name")}
document_id: {chunk.metadata.get("document_id")}
chunk_index: {chunk.metadata.get("chunk_index")}
document_url: {chunk.metadata.get("document_url")}

content:
{chunk.page_content}
"""

    prompt += """
OUTPUT FORMAT (JSON ONLY):
{
  "answer": "string",
  "citations": [
    {
      "document_name": "string",
      "document_id": "string",
      "chunk_index": number,
      "document_url": "string",
      "excerpt": "string (representative excerpt from the chunk)"
    }
  ],
  "confidence": "high | medium | low"
}

IMPORTANT:
- Citations MUST be unique by (document_id, chunk_index).
- Do NOT repeat citations from the same chunk.
"""

    return prompt
