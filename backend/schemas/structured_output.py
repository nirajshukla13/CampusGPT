from typing import List, Literal
from pydantic import BaseModel, Field


class Citation(BaseModel):
    document_name: str = Field(..., description="Name of the source document")
    document_id: str = Field(..., description="Internal document identifier")
    chunk_index: int = Field(..., description="Chunk index used as evidence")
    document_url: str = Field(..., description="Download URL of the document")
    uploaded_by: str = Field(..., description="User details used as a uploader reference")

class StructuredRAGAnswer(BaseModel):
    answer: str = Field(..., description="Final grounded answer to the user query")
    citations: List[Citation] = Field(
        ..., description="List of citations supporting the answer"
    )
    confidence: Literal["high", "medium", "low"] = Field(
        ..., description="Confidence based on evidence strength"
    )
