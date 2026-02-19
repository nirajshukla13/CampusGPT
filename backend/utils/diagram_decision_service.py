from config import settings


class DiagramDecisionService:
    """
    Decides whether diagram is needed and generates a standardized diagram query.
    """

    def decide(self, user_query: str) -> dict:
        client = settings.get_gemini_client()

        prompt = f"""
You are an intelligent system that decides whether a diagram is needed.

Rules:
- If the query is conceptual (process, phases, workflow, architecture) → diagram needed
- If query is factual (resources, definition, list, notes) → no diagram

Return ONLY JSON:

{{
  "needs_diagram": true/false,
  "diagram_query": "standardized diagram instruction if needed, else empty string"
}}

Examples:

Input: What are phases of compiler?
Output:
{{
  "needs_diagram": true,
  "diagram_query": "Generate a flowchart showing all phases of a compiler including lexical analysis, syntax analysis, semantic analysis, code generation"
}}

Input: What resources are available for SPCC?
Output:
{{
  "needs_diagram": false,
  "diagram_query": ""
}}

User Query:
\"\"\"{user_query}\"\"\"
"""

        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt
        )

        text = response.text.strip()

        # simple JSON extraction
        start = text.find("{")
        end = text.rfind("}")
        json_text = text[start:end+1]

        import json
        return json.loads(json_text)
