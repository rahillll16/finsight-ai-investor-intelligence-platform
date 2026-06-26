from llm.openai_client import get_llm
from llm.openai_client import get_embedding_model

from vectorstore.chroma_db import get_collection

def ask_question(question: str) -> str:
    
    embedding_model = get_embedding_model()
    
    query_embedding = embedding_model.embed_query(
        question
    )
    
    collection = get_collection()
    
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )
    
    documents = results.get("documents")

    if not documents:
        return "No relevant information found."

    context = "\n\n".join(documents[0])
    
    prompt = f"""
You are a financial analyst.

Answer the question only using the context below.

Context:
{context}

Question:
{question}

Answer:
"""

    llm = get_llm()

    response = llm.invoke(prompt)

    return str(response.content)