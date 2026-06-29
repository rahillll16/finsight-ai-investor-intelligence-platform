from retrieval.hybrid_retriever import HybridRetriever

retriever = HybridRetriever()

results = retriever.retrieve(
    query="research and development expense",
    company="Tesla",
    top_k=5
)

for idx, result in enumerate(results, 1):

    print(f"\nResult {idx}\n")

    print(result[:1000])