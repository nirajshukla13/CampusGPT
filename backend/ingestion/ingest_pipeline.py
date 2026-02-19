from .utils import (
    partition_document,
    create_chunks_by_title,
    summarise_chunks,
    create_vector_store
)

def ingest_pipeline(
    doc_path: str,
    persist_directory: str,
    document_id: str,
    document_name: str,
    document_url: str,
    uploader: dict
):
    text = partition_document(doc_path)
    chunks = create_chunks_by_title(text)

    chunks = chunks[:25]

    documents = summarise_chunks(
        chunks=chunks,
        document_id=document_id,
        document_name=document_name,
        document_url=document_url,
        uploader=uploader
    )

    create_vector_store(
        documents,
        persist_directory=persist_directory
    )
