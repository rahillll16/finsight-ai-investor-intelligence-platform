from llm.openai_client import get_llm

from retrieval.hybrid_retriever import HybridRetriever
from retrieval.reranker import Reranker
from retrieval.query_expander import expand_query


retriever = HybridRetriever()
reranker = Reranker()


def ask_question(
    question: str,
    company: str | None = None,
    user_id: int | None = None
) -> str:
    
    expanded_query = expand_query(question)

    print(f"\nExpanded Query: {expanded_query}")

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
        return "No relevant information found."

    context = "\n\n".join(documents)

    prompt = f"""
You are an expert financial analyst.

Answer the question ONLY using the context provided.

If the information is unavailable, clearly say so.

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
        )

    return str(response.content)