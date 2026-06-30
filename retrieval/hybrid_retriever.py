from llm.openai_client import get_embedding_model
from retrieval.bm25_retriever import BM25Retriever
from vectorstore.chroma_db import get_collection


class HybridRetriever:
    
    def __init__(self):
        
        self.embedding_model = get_embedding_model()
        
        self.collection = get_collection()
        
        self.bm25 = BM25Retriever()
        
    def retrieve(
        self,
        query: str,
        company: str | None = None,
        top_k: int = 5,
        user_id: int | None = None,
        
    ):
        
        query_embedding = self.embedding_model.embed_query(
            query
        )
        
        semantic_params = {
            "query_embeddings": [query_embedding],
            "n_results": top_k
        }
        
        if company and user_id:
            semantic_params["where"] = {
                "$and": [
                    {"company": company},
                    {"user_id": user_id}
                ]
            }

        elif company:
            semantic_params["where"] = {
                "company": company
            }
            
        semantic_results = self.collection.query(
            **semantic_params
        )
        
        semantic_docs = (semantic_results.get("documents") or [[]]
        )[0]
        
        bm25_docs = self.bm25.retrieve(
            query,
            company=company,
            user_id=user_id,
            top_k=top_k
        )
        
        combined_docs = list(
            set(semantic_docs + bm25_docs)
        )
        
        return combined_docs[:top_k]