from fastapi import APIRouter, UploadFile, File
from ingestion.ingest_pdf import ingest_pdf
import uuid
import os

router = APIRouter(prefix="/ingest", tags=["Ingestion"])

UPLOAD_DIR = "uploads"

@router.post("")
async def ingest_document(file: UploadFile = File(...)):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    ingest_pdf(
        pdf_path=file_path,
        persist_directory="vectorstore"
    )

    return {
        "message": "Document ingested successfully",
        "document_id": file_id
    }
