from pydantic import BaseModel, Field, ValidationError
from typing import Optional


class DiagramResponse(BaseModel):
    """
    Validates structured output from Gemini.
    """

    explanation: str = Field(
        ...,
        min_length=5,
        description="Short explanation of the concept"
    )

    diagram: str = Field(
        ...,
        min_length=10,
        description="Valid Mermaid diagram code"
    )


class ErrorResponse(BaseModel):
    """
    Standardized error response format.
    """

    success: bool = False
    error: str
    details: Optional[str] = None
