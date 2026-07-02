from llm.openai_client import get_llm

from retrieval.hybrid_retriever import HybridRetriever
from retrieval.reranker import Reranker
from retrieval.query_expander import expand_query


retriever = HybridRetriever()
reranker = Reranker()


def extract_metric(
    question: str,
    company: str | None = None,
    user_id: int | None = None
) -> str:

    expanded_query = expand_query(question)

    # print(f"\nExpanded Query: {expanded_query}")

    documents = retriever.retrieve(
        query=expanded_query,
        company=company,
        user_id=user_id,
        top_k=10
    )

    documents = reranker.rerank(
        query=expanded_query,
        documents=documents,
        top_k=3
    )

    if not documents:
        return "NOT_FOUND"

    context = "\n\n".join(documents)

    prompt = f"""
You are an expert financial data extraction system.

Your task is to extract ONLY the requested financial value.

Rules:

1. Return ONLY the exact value.
2. Do NOT explain.
3. Do NOT provide calculations.
4. Do NOT provide formulas.
5. Do NOT provide analysis.
6. Preserve currencies, percentages and units.
7. If the information is unavailable, return exactly:

NOT_FOUND

Examples:

Question:
What was the total revenue in 2024?

Answer:
$97,690 million

Question:
What was the operating margin in 2024?

Answer:
10.8%

Context:
{context}

Question:
{question}

Answer:
"""

    llm = get_llm()

    response = llm.invoke(prompt)

    if isinstance(response.content, list):

        return "\n".join(
            str(item)
            for item in response.content
        ).strip()

    return str(response.content).strip()