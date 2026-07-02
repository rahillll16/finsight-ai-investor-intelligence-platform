from database.db import SessionLocal
from database.metrics import FinancialMetric
from database.user import User


def save_metrics(
    metrics: dict,
    company: str,
    year: int,
    user_id: int
):

    db = SessionLocal()

    try:

        metric = FinancialMetric(
            company=company,
            year=year,
            revenue=metrics.get("revenue"),
            net_income=metrics.get("net_income"),
            cash_flow=metrics.get("cash_flow"),
            debt=metrics.get("debt"),
            operating_margin=metrics.get("operating_margin"),
            r_and_d_expense=metrics.get("r_and_d_expense"),
            user_id=user_id
        )

        db.add(metric)
        db.commit()
        db.refresh(metric)

        # print(
        #     f"Metrics saved successfully for {company}."
        # )

    finally:
        db.close()