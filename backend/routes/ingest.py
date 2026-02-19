from fastapi import APIRouter, UploadFile, File
from ingestion.ingest_pipeline import ingest_pipeline
from config import UPLOADS_DIR, VECTOR_DB_DIR
from utils.imagekit_client import upload_document
import uuid

router = APIRouter(prefix="/ingest", tags=["Ingestion"])

HARDCODED_USER = {
    "id": "user_001",
    "name": "Sumit Sonkamble",
    "email": "sumit@campusgpt.dev"
}

@router.post("")
async def ingest_document(file: UploadFile = File(...)):
    document_id = str(uuid.uuid4())
    original_filename = file.filename

    file_path = UPLOADS_DIR / f"{document_id}_{original_filename}"

    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())

        upload_result = upload_document(
            file_path=file_path,
            folder="campusgpt/documents"
        )

        ingest_pipeline(
            doc_path=str(file_path),
            persist_directory=str(VECTOR_DB_DIR),
            document_id=document_id,
            document_name=original_filename,
            document_url=upload_result["url"],         
            uploader=HARDCODED_USER
        )

        return {
            "message": "Document ingested successfully",
            "document_id": document_id,
            "document_name": original_filename,
            "download_url": upload_result["url"]
        }

    finally:
        if file_path.exists():
            file_path.unlink()
