import json
from typing import List

from pypdf import PdfReader
from dotenv import load_dotenv

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage

load_dotenv()

def partition_document(file_path: str) -> str:
    print(f"📄 Reading PDF: {file_path}")

    reader = PdfReader(file_path)
    pages = []

    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)

    full_text = "\n\n".join(pages)
    print(f"✅ Extracted text from {len(pages)} pages")
    return full_text

def create_chunks_by_title(text: str) -> List[str]:
    print("✂️ Creating chunks")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        separators=["\n\n", "\n", " ", ""]
    )

    chunks = splitter.split_text(text)
    print(f"✅ Created {len(chunks)} chunks")
    return chunks

def separate_content_types(chunk_text: str):
    """
    Very light heuristic:
    - If text has many pipes or aligned columns → table-like
    """
    tables = []
    lines = chunk_text.splitlines()

    table_lines = [l for l in lines if "|" in l or "\t" in l]

    if len(table_lines) >= 3:
        tables.append(chr(10).join(table_lines))

    return {
        "text": chunk_text,
        "tables": tables,
        "images": [],
        "types": ["text"] + (["table"] if tables else [])
    }

def create_ai_enhanced_summary(text: str, tables: List[str]) -> str:
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

        prompt = f"""
You are creating a searchable description for document retrieval.

TEXT:
{text}
"""

        if tables:
            prompt += "\nTABLES:\n"
            for i, table in enumerate(tables):
                prompt += f"Table {i+1}:\n{table}\n\n"

        prompt += """
TASK:
1. Extract key facts and data
2. Identify main topics
3. List questions this content can answer
4. Add alternative search phrases

SEARCHABLE DESCRIPTION:
"""

        message = HumanMessage(content=prompt)
        response = llm.invoke([message])
        return response.content

    except Exception as e:
        print(f"❌ AI summary failed: {e}")
        return text[:300] + "..."

def summarise_chunks(chunks: List[str]) -> List[Document]:
    print("🧠 Processing chunks with AI summaries")

    documents = []

    for i, chunk in enumerate(chunks, 1):
        print(f"   Chunk {i}/{len(chunks)}")

        content = separate_content_types(chunk)

        if content["tables"]:
            enhanced = create_ai_enhanced_summary(
                content["text"],
                content["tables"]
            )
        else:
            enhanced = content["text"]

        doc = Document(
            page_content=enhanced,
            metadata={
                "original_content": json.dumps({
                    "raw_text": content["text"],
                    "tables": content["tables"]
                })
            }
        )

        documents.append(doc)

    print(f"✅ Processed {len(documents)} chunks")
    return documents

def create_vector_store(documents, persist_directory="vectorstore"):
    print("🔮 Creating vector store")

    embeddings = GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-001"
    )

    vectorstore = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=persist_directory,
        collection_metadata={"hnsw:space": "cosine"}
    )

    print(f"✅ Vector store saved at {persist_directory}")
    return vectorstore
