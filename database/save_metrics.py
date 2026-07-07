from database.db import SessionLocal
from database.metrics import FinancialMetric
from database.user import User



def update_if_found(obj, field, value):

    if (
        value is not None
        and str(value).strip() != ""
        and value != "NOT_FOUND"
    ):
        setattr(obj, field, value)


def save_metrics(
    metrics: dict,
    company: str,
    year: int,
    user_id: int
):

    db = SessionLocal()

    try:
        
        existing_metric = (
            db.query(FinancialMetric)
            .filter(
                FinancialMetric.company == company,
                FinancialMetric.year == year,
                FinancialMetric.user_id == user_id
            )
            .first()
        )
        
        if existing_metric:

            update_if_found(
                existing_metric,
                "revenue",
                metrics.get("revenue")
            )

            update_if_found(
                existing_metric,
                "net_income",
                metrics.get("net_income")
            )

            update_if_found(
                existing_metric,
                "cash_flow",
                metrics.get("cash_flow")
            )

            update_if_found(
                existing_metric,
                "debt",
                metrics.get("debt")
            )

            update_if_found(
                existing_metric,
                "operating_margin",
                metrics.get("operating_margin")
            )

            update_if_found(
                existing_metric,
                "r_and_d_expense",
                metrics.get("r_and_d_expense")
            )

        else:

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