def is_followup_question(query: str) -> bool:
    followup_keywords = [
        "earlier",
        "previous",
        "you mentioned",
        "that part",
        "expand",
        "elaborate",
        "what you said",
        "in your last answer",
        "as discussed"
    ]

    query_lower = query.lower()
    return any(keyword in query_lower for keyword in followup_keywords)

def build_structured_prompt(
    chunks,
    query: str,
    conversation_context: str = ""
):
    is_followup = is_followup_question(query)

    prompt = """
You are CampusGPT, a retrieval-augmented conversational question answering system.
"""

    # -------------------------
    # CASE 1: FOLLOW-UP QUESTION
    # -------------------------
    if is_followup and conversation_context.strip():
        prompt += """

This question appears to be a follow-up to previous conversation.

PRIORITY ORDER:

1. First check if document excerpts contain relevant information.
2. If NOT, you MAY answer using previous conversation context.
3. Do NOT use external knowledge.
4. Never fabricate information.

MEMORY RULES:

- If answer is derived ONLY from previous conversation → citations MUST be [].
- If answer is derived from document excerpts → citations are REQUIRED.
- Never cite previous conversation.
"""

    # -------------------------
    # CASE 2: NORMAL RAG QUESTION
    # -------------------------
    else:
        prompt += """

STRICT MODE:

You MUST answer using ONLY the provided document excerpts.
Do NOT use previous conversation for answering.
Do NOT use external knowledge.
If answer is not found in excerpts, say information is not available.

Citations are REQUIRED.
"""

    # -------------------------
    # Add Memory (only if follow-up)
    # -------------------------
    if is_followup and conversation_context.strip():
        prompt += f"""

PREVIOUS CONVERSATION (For context only — NOT for citation)
{conversation_context}
"""

    # -------------------------
    # Add Question
    # -------------------------
    prompt += f"""

QUESTION
{query}

DOCUMENT EXCERPTS
"""

    # -------------------------
    # Add Chunks
    # -------------------------
    for i, chunk in enumerate(chunks, start=1):
        prompt += f"""
--- CHUNK {i} ---
document_name: {chunk.metadata.get("document_name")}
document_id: {chunk.metadata.get("document_id")}
chunk_index: {chunk.metadata.get("chunk_index")}
document_url: {chunk.metadata.get("document_url")}
uploaded_by: {chunk.metadata.get("uploader", "")}

content:
{chunk.page_content}
"""

    # -------------------------
    # Output Format
    # -------------------------
    prompt += """

OUTPUT FORMAT (JSON ONLY)

{
  "answer": "string",
  "citations": [
    {
      "document_name": "string",
      "document_id": "string",
      "chunk_index": number,
      "document_url": "string",
      "uploaded_by": "string"
    }
  ],
  "confidence": "high | medium | low"
}

FINAL RULES:

- If answer is based ONLY on memory → citations MUST be [].
- If answer is based on document excerpts → citations MUST follow uniqueness rules.
- Never mix memory facts with document citations.
- Output ONLY valid JSON.
"""

    return prompt
