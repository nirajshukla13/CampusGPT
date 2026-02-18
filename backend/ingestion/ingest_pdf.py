from utils import (
    partition_document,
    create_chunks_by_title,
    summarise_chunks,
    create_vector_store
)

def ingest_pdf(pdf_path: str, persist_directory: str):
    """Runs once when a user uploads a PDF"""

    # Step 1: Partition
    elements = partition_document(pdf_path)

    # Step 2: Chunk
    chunks = create_chunks_by_title(elements)

    # Step 3: Limit chunks (API safety)
    chunks = chunks[:25]

    # Step 4: Summarize + convert to Documents
    documents = summarise_chunks(chunks)

    # Step 5: Store embeddings
    create_vector_store(
        documents,
        persist_directory=persist_directory
    )
