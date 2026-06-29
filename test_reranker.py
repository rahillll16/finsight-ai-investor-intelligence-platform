from retrieval.hybrid_retriever import HybridRetriever
from retrieval.reranker import Reranker

query = "research and development expense"

retriever = HybridRetriever()

documents = retriever.retrieve(
    query=query,
    company="Tesla",
    top_k=10
)

reranker = Reranker()

results = reranker.rerank(
    query=query,
    documents=documents,
    top_k=3
)

for idx, result in enumerate(results, 1):

    print(f"\nResult {idx}\n")
    print(result[:1000])