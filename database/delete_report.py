from database.db import SessionLocal
from database.metrics import FinancialMetric


def delete_metrics(
    company: str,
    year: int,
    user_id: int
):
    db = SessionLocal()

    try:
        db.query(FinancialMetric).filter(
            FinancialMetric.company == company,
            FinancialMetric.year == year,
            FinancialMetric.user_id == user_id
        ).delete()

        db.commit()

    finally:
        db.close()