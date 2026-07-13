from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import cast

from auth.oauth2 import get_current_user
from database.user import User

from database.db import SessionLocal
from database.metrics import FinancialMetric

from rag.comparison_insights import generate_comparison_insights


router = APIRouter(
    prefix="/comparison",
    tags=["Comparison"]
)


@router.get("/")
def compare_companies(
        company1: str,
        company2: str,
        current_user: User = Depends(
        get_current_user
    )
):

    db: Session = SessionLocal()

    metric1 = (
        db.query(FinancialMetric)
        .filter(
            FinancialMetric.company == company1,
            FinancialMetric.user_id == current_user.id
        )
        .first()
    )

    metric2 = (
        db.query(FinancialMetric)
        .filter(
            FinancialMetric.company == company2,
            FinancialMetric.user_id == current_user.id
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
    
    
@router.get("/insights")
def comparison_insights(

    company1: str,

    company2: str,

    current_user: User = Depends(
        get_current_user
    )

):
    user_id = cast(int, current_user.id)

    return generate_comparison_insights(

        company1=company1,

        company2=company2,

        user_id=user_id

    )