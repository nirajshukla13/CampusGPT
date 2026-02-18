from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

PERSIST_DIR = "vectorstore"

def load_vector_db():
    embedding_model = GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-001"
    )

    return Chroma(
        persist_directory=PERSIST_DIR,
        embedding_function=embedding_model,
        collection_metadata={"hnsw:space": "cosine"}
    )
