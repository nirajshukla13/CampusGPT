from utils.diagram_prompt import build_diagram_prompt
from utils.llm_service import LLMService
from schemas.response_model import DiagramResponse
from pydantic import ValidationError


class DiagramService:
    """
    Orchestrates prompt creation, LLM call, and response validation.
    """

    def __init__(self):
        self.llm_service = LLMService()

    def _validate_mermaid(self, diagram_code: str) -> str:
        """
        Basic validation to ensure Mermaid diagram has a valid starting keyword.
        """

        valid_starts = [
            "flowchart",
            "graph",
            "sequenceDiagram",
            "classDiagram",
            "stateDiagram",
            "erDiagram"
        ]

        if not any(diagram_code.strip().startswith(k) for k in valid_starts):
            raise ValueError("Invalid Mermaid diagram type returned by model.")

        return diagram_code

    def generate_diagram(self, user_query: str) -> dict:
        """
        Main function to generate explanation + Mermaid diagram.
        """

        if not user_query or len(user_query.strip()) < 3:
            return {
                "success": False,
                "error": "Query too short. Please provide a meaningful query."
            }

        try:
            # 1️⃣ Build Prompt
            prompt = build_diagram_prompt(user_query)

            # 2️⃣ Call LLM
            raw_output = self.llm_service.generate(prompt)

            # 3️⃣ Validate JSON structure
            validated = DiagramResponse(**raw_output)

            # 4️⃣ Validate Mermaid structure
            validated.diagram = self._validate_mermaid(validated.diagram)

            return {
                "success": True,
                "explanation": validated.explanation,
                "diagram": validated.diagram
            }

        except ValidationError as ve:
            return {
                "success": False,
                "error": "Invalid response structure from model.",
                "details": str(ve)
            }

        except ValueError as ve:
            return {
                "success": False,
                "error": str(ve)
            }

        except Exception as e:
            return {
                "success": False,
                "error": "Unexpected server error.",
                "details": str(e)
            }

