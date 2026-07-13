import json

from database.db import SessionLocal
from database.metrics import FinancialMetric

from llm.openai_client import get_llm


def generate_insights(
    company: str,
    user_id: int
):

    db = SessionLocal()

    try:

        metric = (
            db.query(FinancialMetric)
            .filter(
                FinancialMetric.company == company,
                FinancialMetric.user_id == user_id
            )
            .first()
        )

        if not metric:

            return {
                "summary": "No insights available.",
                "growth_drivers": [],
                "risk_factors": []
            }
            
        confidence = 0

        if metric.revenue not in (None, "", "NOT_FOUND"):
            confidence += 25

        if metric.net_income not in (None, "", "NOT_FOUND"):
            confidence += 20

        if metric.cash_flow not in (None, "", "NOT_FOUND"):
            confidence += 20

        if metric.debt not in (None, "", "NOT_FOUND"):
            confidence += 15

        if metric.operating_margin not in (None, "", "NOT_FOUND"):
            confidence += 10

        if metric.r_and_d_expense not in (None, "", "NOT_FOUND"):
            confidence += 10

        prompt = f"""
You are FinSight AI, a senior equity research analyst.

Your job is to generate professional investor insights STRICTLY from the financial metrics provided.

Company:
{company}

Financial Metrics

Revenue:
{metric.revenue}

Net Income:
{metric.net_income}

Operating Cash Flow:
{metric.cash_flow}

Debt:
{metric.debt}

Operating Margin:
{metric.operating_margin}

Research & Development Expense:
{metric.r_and_d_expense}

Instructions

1. Use ONLY the financial metrics above.
2. Never use prior knowledge about the company.
3. Never mention products, markets, management, competitors or geography unless directly supported by the metrics.
4. Every strength and risk MUST reference one or more metrics.
5. If any metric is NOT_FOUND, mention that it limits the analysis instead of inventing information.
6. Keep the summary under 60 words.
7. Return exactly 3 strengths.
8. Return exactly 3 risks.
9. Determine an overall financial outlook using ONLY the provided metrics.
10. Give a confidence score between 0 and 100 based on how complete the available metrics are.
11. Return ONLY valid JSON.

Examples

Good Strength:
"Operating cash flow of $118,254 million demonstrates strong cash generation."

Bad Strength:
"Expansion into emerging markets."

Good Risk:
"Debt of $97.3 billion should be monitored despite healthy cash generation."

Bad Risk:
"Competition in the technology sector."

Return ONLY this JSON:

{{
    "summary": "...",

    "strengths": [
        "...",
        "...",
        "..."
    ],

    "risks": [
        "...",
        "...",
        "..."
    ],

    "outlook": {{
        "rating": "Positive",
    }}
}}
"""

        llm = get_llm(
            temperature=0.3
        )

        response = llm.invoke(prompt)

        if isinstance(response.content, list):
            response_text = "\n".join(
                str(item)
                for item in response.content
            )
        else:
            response_text = str(response.content)
            
        response_text = (
            response_text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        result = json.loads(response_text)

        result["outlook"]["confidence"] = confidence

        return result
    


    finally:

        db.close()