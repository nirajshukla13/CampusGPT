from retrieval.vector_store import VectorStore

def retrieve_chunks(query: str, k: int = 3):
    vector_store = VectorStore.get_instance(persist_dir="dbV2")
    return vector_store.retrieve(query, k)
