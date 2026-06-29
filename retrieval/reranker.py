from sentence_transformers import CrossEncoder
from typing import List


class Reranker:

    def __init__(self):

        self.model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

    def rerank(
        self,
        query: str,
        documents: list[str],
        top_k: int = 3
    ) -> list[str]:

        pairs = [
            [query, doc]
            for doc in documents
        ]

        scores = self.model.predict(pairs)

        scored_documents: List[tuple[str, float]] = []

        for doc, score in zip(documents, scores):

            scored_documents.append(
                (doc, float(score))
            )

        ranked: List[tuple[str, float]] = sorted(
            scored_documents,
            key=lambda item: item[1],
            reverse=True
        )

        return [
            doc
            for doc, _ in ranked[:top_k]
        ]