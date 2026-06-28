from sqlalchemy import Column, Integer, String, Float

from database.db import Base

class FinancialMetric(Base):
    
    __tablename__ = "financial_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    
    company = Column(String, nullable = False)
    year = Column(Integer, nullable=False)
    
    revenue = Column(String, nullable=True)
    net_income = Column(String, nullable=True)
    cash_flow = Column(String, nullable=True)
    debt = Column(String, nullable=True)
    operating_margin = Column(String, nullable=True)
    r_and_d_expense = Column(String, nullable=True)