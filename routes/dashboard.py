from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import cast

from auth.oauth2 import get_current_user
from database.user import User

from database.db import SessionLocal
from database.metrics import FinancialMetric
from rag.ai_insights import generate_insights

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/companies/list")
def get_user_companies(
    current_user: User = Depends(
        get_current_user
    )
):

    db: Session = SessionLocal()

    companies = (
        db.query(FinancialMetric.company)
        .filter(
            FinancialMetric.user_id == current_user.id
        )
        .distinct()
        .all()
    )

    db.close()

    return [
        company[0]
        for company in companies
    ]
    

@router.get("/{company}")
def get_dashboard_data(
    company: str,
    current_user: User = Depends(
        get_current_user
    )
):
    
    db: Session = SessionLocal()
    
    metric = (
        db.query(FinancialMetric).filter(
            FinancialMetric.company == company,
            FinancialMetric.user_id == current_user.id
        )
        .first()
    )
    
    db.close()
    
    if not metric:
        raise HTTPException(
            status_code=404,
            detail="Company data not found."
        )
        
    return {
        "company": metric.company,
        "year": metric.year,
        "revenue": metric.revenue,
        "net_income": metric.net_income,
        "cash_flow": metric.cash_flow,
        "debt": metric.debt,
        "operating_margin": metric.operating_margin,
        "r_and_d_expense": metric.r_and_d_expense
    }
    

@router.get("/{company}/insights")
def get_ai_insights(
    company: str,
    current_user: User = Depends(get_current_user)
):

    user_id = cast(int, current_user.id)

    return generate_insights(
        company=company,
        user_id=user_id
    )