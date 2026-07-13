import json

from database.db import SessionLocal
from database.metrics import FinancialMetric

from llm.openai_client import get_llm


def generate_comparison_insights(
    company1: str,
    company2: str,
    user_id: int
):

    db = SessionLocal()

    try:

        metric1 = (
            db.query(FinancialMetric)
            .filter(
                FinancialMetric.company == company1,
                FinancialMetric.user_id == user_id
            )
            .first()
        )

        metric2 = (
            db.query(FinancialMetric)
            .filter(
                FinancialMetric.company == company2,
                FinancialMetric.user_id == user_id
            )
            .first()
        )

        if not metric1 or not metric2:

            return {

                "winner": None,

                "recommendation": "Unavailable",

                "summary": "Comparison could not be generated.",

                "reasons": [],

                "confidence": 0

            }
            
        confidence = 0

        metrics = [

            metric1.revenue,
            metric1.net_income,
            metric1.cash_flow,
            metric1.debt,
            metric1.operating_margin,
            metric1.r_and_d_expense,

            metric2.revenue,
            metric2.net_income,
            metric2.cash_flow,
            metric2.debt,
            metric2.operating_margin,
            metric2.r_and_d_expense

        ]

        for value in metrics:

            if value not in (None, "", "NOT_FOUND"):

                confidence += 100 / len(metrics)

        confidence = round(confidence)
        
        
        prompt = f"""
You are FinSight AI, a senior equity research analyst.

Your task is to recommend ONE company for a long-term investment using ONLY the financial metrics provided.

Company 1

Name:
{company1}

Revenue:
{metric1.revenue}

Net Income:
{metric1.net_income}

Operating Cash Flow:
{metric1.cash_flow}

Debt:
{metric1.debt}

Operating Margin:
{metric1.operating_margin}

Research & Development Expense:
{metric1.r_and_d_expense}


-----------------------------------------


Company 2

Name:
{company2}

Revenue:
{metric2.revenue}

Net Income:
{metric2.net_income}

Operating Cash Flow:
{metric2.cash_flow}

Debt:
{metric2.debt}

Operating Margin:
{metric2.operating_margin}

Research & Development Expense:
{metric2.r_and_d_expense}


Instructions

1. Use ONLY the financial metrics above.
2. Never use prior knowledge about the companies.
3. Ignore metrics whose value is NOT_FOUND.
4. Higher is better for Revenue, Net Income, Cash Flow and Operating Margin.
5. Lower is better for Debt.
6. R&D should only influence the recommendation if profitability is similar.
7. Recommend exactly ONE company.
8. The recommendation MUST be exactly one of the following:

- Strong Buy
- Buy
- Hold
- Avoid

Recommendation Guide

Strong Buy
- One company clearly outperforms the other on most important financial metrics.

Buy
- One company is moderately stronger overall.

Hold
- Both companies are financially similar or the available data is insufficient for a strong recommendation.

Avoid
- Both companies exhibit significant weaknesses or insufficient financial quality.

Do not use any other recommendation text.
9. Keep the summary under 80 words.
10. Give exactly 3 reasons.
11. Return ONLY valid JSON.


Return

{{
    "winner": "",
    "recommendation": "Strong Buy", // an example
    "summary": "",
    "reasons": [
        "",
        "",
        ""
    ]
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

            response_text = str(
                response.content
            )

        response_text = (
            response_text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        result = json.loads(
            response_text
        )

        result["confidence"] = confidence

        return result

    finally:

        db.close()
