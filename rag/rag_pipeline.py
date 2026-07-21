from llm.openai_client import get_llm

from retrieval.hybrid_retriever import HybridRetriever
from retrieval.reranker import Reranker
from retrieval.query_expander import expand_query


retriever = HybridRetriever()
reranker = Reranker()


def ask_question(
    question: str,
    company: str | None = None,
    user_id: int | None = None,
    history: list | None = None
) -> str:
    
    history_text = ""

    if history:
        for msg in history[-6:]:  # Last 6 messages
            history_text += f"{msg.role.title()}: {msg.content}\n"
    
    expanded_query = expand_query(question)

    # print(f"\nExpanded Query: {expanded_query}")

    documents = retriever.retrieve(
        query=expanded_query,
        company=company,
        user_id=user_id,
        top_k=10
    )
    
    # print("\nRetrieved Documents:", len(documents))
    # print(documents[:2])

    documents = reranker.rerank(
        query=expanded_query,
        documents=documents,
        top_k=5
    )

    if not documents:
        return "No relevant information found."

    context = ""

    for i, doc in enumerate(documents, start=1):
        context += f"Document {i}:\n{doc}\n\n"

    prompt = prompt = f"""
You are FinSight AI,
an AI-powered financial intelligence assistant.

Your job is to help users understand annual reports,
financial statements,
business performance,
risks,
cash flow,
profitability,
debt,
growth,
and other financial metrics.

You MUST answer ONLY using the retrieved context.

Never use outside knowledge.

If the answer cannot be found in the provided context, say:

"I couldn't find this information in the uploaded financial reports."

When answering:

• Be concise.
• Preserve every numerical value exactly.
• Use bullet points whenever appropriate.
• Explain why a financial metric matters.
• Never speculate.
• Never invent numbers.
• Never mention that you are an AI language model.

If the user greets you,
respond naturally.

If the user asks a non-financial question,
politely explain that FinSight AI is designed for financial document analysis.

Return only the answer.

Conversation History:

{history_text}

Retrieved Financial Context:

{context}

Current Question:

{question}

Answer in Markdown.

Use:

- Bullet points when listing facts.
- Short paragraphs.
- Preserve numerical values exactly.
- If appropriate, end with one sentence explaining why this matters to investors.
"""

    llm = get_llm()

    response = llm.invoke(prompt)

    if isinstance(response.content, list):
        return "\n".join(
            str(item)
            for item in response.content
        )

    return str(response.content)