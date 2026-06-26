import chromadb

from chromadb.config import Settings

client = chromadb.PersistentClient(
    path = "./chroma_db"
)

def get_collection():
    
    return client.get_or_create_collection(
        name="finsight-ai"
    )
    

def add_documents(documents, embeddings, ids, metadatas):
    
    collection = get_collection()
    
    collection.add(
        documents=documents,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas
    )
    
    
def similarity_search(query_embedding, n_results=5):
    
    collection = get_collection()
    
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    
    return results