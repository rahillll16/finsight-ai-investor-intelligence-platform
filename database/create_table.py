from database.db import Base, engine
from database.user import User

#import all models here
from database.metrics import FinancialMetric

def create_table():
    
    Base.metadata.create_all(bind = engine)
    
    print("Tables created successfully.")
    
if __name__ == "__main__":
    create_table()