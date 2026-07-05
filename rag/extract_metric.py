from llm.openai_client import get_llm

from retrieval.hybrid_retriever import HybridRetriever
from retrieval.reranker import Reranker
from retrieval.query_expander import expand_query
# from rag.metric_parser import parse_metric


retriever = HybridRetriever()
reranker = Reranker()


def extract_metric(
    question: str,
    metric: str,
    company: str | None = None,
    user_id: int | None = None
) -> str:

    expanded_query = expand_query(question)

    # print(f"\nExpanded Query: {expanded_query}")

    documents = retriever.retrieve(
        query=expanded_query,
        company=company,
        user_id=user_id,
        top_k=6
    )

    documents = reranker.rerank(
        query=expanded_query,
        documents=documents,
        top_k=2
    )

    if not documents:
        return "NOT_FOUND"
    
    print(f"\nExtracting: {question}")
    print(f"Retrieved Chunks: {len(documents)}")
    
    # print("=" * 80)
    # print(question)

    # for i, doc in enumerate(documents):
    #     print(f"\nChunk {i+1}")
    #     print(doc[:800])

    context = "\n\n".join(documents)
    
    # value = parse_metric(context)
    
    # if value:
    #     return value
    
    metric_instructions = {
        "revenue":
            "Revenue may appear as Revenue, Total Revenue, Total Revenues, or Net Sales.",

        "net_income":
            "Net income may appear as Net Income, Net Earnings, Profit, or Net Income Attributable to Common Stockholders.",

        "cash_flow":
            "Operating cash flow may appear as Net Cash Provided by Operating Activities or Cash from Operations.",

        "debt":
            "Debt may appear as Total Debt, Long-term Debt, Outstanding Notes, Term Debt or Principal Amount Outstanding.",

        "r_and_d_expense":
            "Research and development expense may appear as Research and Development, R&D Expense, or Research Spending."
    }

    instruction = metric_instructions.get(metric, "")

    prompt = f"""
You are an expert financial data extraction system.

Your job is to extract ONE financial metric from an annual report.

{instruction}

Rules:

1. Search both tables and paragraphs.
2. Extract ONLY the 2024 value.
3. If multiple years appear, always return the 2024 value.
4. Preserve $, %, million and billion or any other currency indicator.
5. Return ONLY the value.
6. Do NOT explain.
7. Do NOT calculate.
8. Return NOT_FOUND only if the metric truly does not exist anywhere in the context.

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

    answer = str(response.content).strip()

    answer = (
        answer.replace("Answer:", "")
            .replace("Value:", "")
            .replace("'", "")
            .strip()
    )

    return answer