from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from database.db import SessionLocal
from database.metrics import FinancialMetric

router = APIRouter(
    prefix="/comparison",
    tags=["Comparison"]
)


@router.get("/")
def compare_companies(
        company1: str,
        company2: str
):

    db: Session = SessionLocal()

    metric1 = (
        db.query(FinancialMetric)
        .filter(
            FinancialMetric.company == company1
        )
        .first()
    )

    metric2 = (
        db.query(FinancialMetric)
        .filter(
            FinancialMetric.company == company2
        )
        .first()
    )

    db.close()

    if not metric1 or not metric2:

        raise HTTPException(
            status_code=404,
            detail="One or both companies not found."
        )

    return {
        company1: {
            "revenue": metric1.revenue,
            "net_income": metric1.net_income,
            "cash_flow": metric1.cash_flow,
            "debt": metric1.debt,
            "operating_margin": metric1.operating_margin
        },

        company2: {
            "revenue": metric2.revenue,
            "net_income": metric2.net_income,
            "cash_flow": metric2.cash_flow,
            "debt": metric2.debt,
            "operating_margin": metric2.operating_margin
        }
    }