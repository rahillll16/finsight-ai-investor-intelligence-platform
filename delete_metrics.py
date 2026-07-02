from database.db import SessionLocal
from database.metrics import FinancialMetric

db = SessionLocal()

db.query(FinancialMetric).delete()

db.commit()

db.close()

print("All metrics deleted successfully.")