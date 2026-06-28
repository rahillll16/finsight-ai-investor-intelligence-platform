from rag.rag_pipeline import ask_question


def extract_kpis(company: str) -> dict:
    
    questions = {
        "revenue": "What was the company's total revenue in 2024?",
        "net_income": "What was the company's net income in 2024?",
        "cash_flow": "What was the company's operating cash flow in 2024?",
        "debt": "What was the company's total debt in 2024?",
        "operating_margin": "What was the company's operating margin in 2024?",
        "r_and_d_expense": "What was the company's research and development expense in 2024?"
    }
    
    results = {}
    
    for metric, question in questions.items():
        
        print(f"Extracting {metric}...")
        
        answer = ask_question(
            question=question,
            company=company
        )
        
        results[metric] = answer
        
    return results