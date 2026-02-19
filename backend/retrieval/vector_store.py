from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

class VectorStore:
    _instance = None

    def __init__(self, persist_dir: str):
        self.embedding_model = GoogleGenerativeAIEmbeddings(
            model="gemini-embedding-001"
        )

        self.db = Chroma(
            persist_directory=persist_dir,
            embedding_function=self.embedding_model,
            collection_metadata={"hnsw:space": "cosine"}
        )

    @classmethod
    def get_instance(cls, persist_dir: str = "vectorstore"):
        if cls._instance is None:
            cls._instance = cls(persist_dir)
        return cls._instance

    def retrieve(self, query: str, k: int = 3):
        retriever = self.db.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={
                "k": k,
                "score_threshold": 0.3
            }
        )
        return retriever.invoke(query)
