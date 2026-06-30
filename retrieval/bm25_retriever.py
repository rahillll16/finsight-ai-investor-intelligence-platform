from rank_bm25 import BM25Okapi

from vectorstore.chroma_db import get_collection


class BM25Retriever:

    def __init__(self):

        self.collection = get_collection()

    def retrieve(
        self,
        query: str,
        company: str | None = None,
        top_k: int = 5,
        user_id: int | None = None,
    ):

        params = {}
        
        if company and user_id:
            params["where"] = {
                "$and": [
                    {"company": company},
                    {"user_id": user_id}
                ]
            }

        elif company:
            params["where"] = {
                "company": company
            }
            
        results = self.collection.get(
            **params
        )
        
        documents = results.get("documents") or []
        
        tokenized_documents = [
            doc.lower().split()
            for doc in documents
        ]
        
        bm25 = BM25Okapi(
            tokenized_documents
        )
        
        tokenized_query = query.lower().split()
        
        scores  = bm25.get_scores(
            tokenized_query
        )
        
        ranked_indices = sorted(
            range(len(scores)),
            key=lambda i : scores[i],
            reverse=True
        )[:top_k]
        
        return [
            documents[i]
            for i in ranked_indices
        ]