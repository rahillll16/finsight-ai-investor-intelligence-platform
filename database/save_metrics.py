from database.db import SessionLocal
from database.metrics import FinancialMetric

def save_metrics(metrics: dict, company: str, year: int):
    
    db = SessionLocal()
    
    metric = FinancialMetric(
        company=company,
        year=year,
        revenue= metrics.get("revenue"),
        net_income=metrics.get("net_income"),
        cash_flow=metrics.get("cash_flow"),
        debt=metrics.get("debt"),
        operating_margin=metrics.get("operating_margin"),
        r_and_d_expense=metrics.get("r_and_d_expense")
    )
    
    db.add(metric)
    db.commit()
    db.refresh(metric)
    
    db.close()
    
    print(f'Metrics saved successfully for {company}.')