import json
from typing import List

from dotenv import load_dotenv

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings
)
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage

from ingestion.load_documents import load_document

load_dotenv()

def partition_document(file_path: str) -> str:
    """
    Loads document content as plain text.
    """
    return load_document(file_path)


def create_chunks_by_title(text: str) -> List[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        separators=["\n\n", "\n", " ", ""]
    )

    chunks = splitter.split_text(text)
    print(f"✅ Created {len(chunks)} chunks")
    return chunks

def separate_content_types(chunk_text: str) -> dict:
    """
    Light heuristic to detect table-like content.
    """
    lines = chunk_text.splitlines()
    table_lines = [l for l in lines if "|" in l or "\t" in l]

    tables = []
    if len(table_lines) >= 3:
        tables.append("\n".join(table_lines))

    return {
        "text": chunk_text,
        "tables": tables
    }

def create_ai_enhanced_summary(text: str, tables: List[str]) -> str:
    """
    Produces an AI-generated searchable summary.
    Used to improve retrieval recall.
    """
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

        prompt = f"""
You are creating a searchable description for document retrieval.

TEXT:
{text}
"""

        if tables:
            prompt += "\nTABLES:\n"
            for i, table in enumerate(tables, start=1):
                prompt += f"Table {i}:\n{table}\n\n"

        prompt += """
TASK:
1. Extract key facts and data
2. Identify main topics
3. List questions this content can answer
4. Add alternative search phrases

SEARCHABLE DESCRIPTION:
"""

        response = llm.invoke([HumanMessage(content=prompt)])
        return response.content

    except Exception as e:
        print(f"❌ AI summary failed: {e}")
        return text[:300] + "..."

def summarise_chunks(
    chunks: List[str],
    document_id: str,
    document_name: str,
    document_url: str,
    uploader: dict
) -> List[Document]:

    documents: List[Document] = []

    for idx, chunk in enumerate(chunks):
        content = separate_content_types(chunk)

        if content["tables"]:
            page_content = create_ai_enhanced_summary(
                content["text"],
                content["tables"]
            )
        else:
            page_content = content["text"]

        documents.append(
            Document(
                page_content=page_content,
                metadata={
                    "document_id": document_id,
                    "document_name": document_name,
                    "document_url": document_url,
                    "uploader": uploader["email"],
                    "chunk_index": idx,

                    "raw_text": content["text"]
                }
            )
        )

    return documents


def create_vector_store(
    documents: List[Document],
    persist_directory: str
):
    """
    Adds documents to a persistent Chroma vector store.
    Safe for repeated ingestion.
    """
    print("🔮 Creating / updating vector store")

    embeddings = GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-001"
    )

    vectorstore = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings,
        collection_metadata={"hnsw:space": "cosine"}
    )

    vectorstore.add_documents(documents)

    print(f"✅ Vector store updated at {persist_directory}")
    return vectorstore
