from vectorstore.chroma_db import get_collection
from llm.openai_client import get_embedding_model

query = "Tesla revenue"

embedding_model = get_embedding_model()

query_embedding = embedding_model.embed_query(query)

collection = get_collection()

results = collection.query(
    query_embeddings=[query_embedding],
    n_results=3
)

print(results)