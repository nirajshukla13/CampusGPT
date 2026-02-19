from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from utils.diagram_service import DiagramService


router = APIRouter()
diagram_service = DiagramService()


class QueryRequest(BaseModel):
    query: str = Field(..., min_length=3, description="User query for diagram generation")


@router.post("/generate-diagram")
async def generate_diagram(request: QueryRequest):
    """
    Generates explanation + Mermaid diagram from user query.
    """

    try:
        result = diagram_service.generate_diagram(request.query)

        if not result.get("success"):
            raise HTTPException(status_code=400, detail=result)

        return result

    except HTTPException as http_err:
        raise http_err

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": "Internal server error.",
                "details": str(e)
            }
        )
