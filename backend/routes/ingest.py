from fastapi import APIRouter, UploadFile, File, Depends
from ingestion.ingest_pipeline import ingest_pipeline
from config import UPLOADS_DIR, VECTOR_DB_DIR
from utils.imagekit_client import upload_document
import uuid
from utils import require_role


router = APIRouter(prefix="/ingest", tags=["Ingestion"])

@router.post("")
async def ingest_document(file: UploadFile = File(...), current_user: dict = Depends(require_role(["student", "faculty", "admin"]))):
    document_id = str(uuid.uuid4())
    original_filename = file.filename
    print("user", current_user)

    file_path = UPLOADS_DIR / f"{document_id}_{original_filename}"
    print(file_path)
    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())

        upload_result = upload_document(
            file_path=file_path,
            folder="campusgpt/documents"
        )

        # ingest_pipeline(
        #     doc_path=str(file_path),
        #     persist_directory=str(VECTOR_DB_DIR),
        #     document_id=document_id,
        #     document_name=original_filename,
        #     document_url=upload_result["url"],         
        #     uploader=current_user["email"]
        # )

        return {
            "message": "Document ingested successfully",
            "document_id": document_id,
            "document_name": original_filename,
            "download_url": upload_result["url"]
        }

    finally:
        if file_path.exists():
            file_path.unlink()
