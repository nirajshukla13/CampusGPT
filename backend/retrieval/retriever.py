from retrieval.load_db import load_vector_db

def retrieve_chunks(query: str, k: int = 3):
    db = load_vector_db()
    retriever = db.as_retriever(search_kwargs={"k": k})
    return retriever.invoke(query)
