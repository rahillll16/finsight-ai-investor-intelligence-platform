from retrieval.bm25_retriever import BM25Retriever

retriever = BM25Retriever()

results = retriever.retrieve(
    "research and development expense",
    top_k =  3
)

for idx, result in enumerate(results,1):
    
    print(f"\nResult {idx}\n")
    print(result[:1000])