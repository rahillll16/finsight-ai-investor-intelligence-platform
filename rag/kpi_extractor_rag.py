from rag.extract_metric import extract_metric


def extract_kpis(company: str, user_id: int) -> dict:
    
    questions = {
        "revenue":
            "Return only the total revenue for 2024.",

        "net_income":
            "Return only the net income for 2024.",

        "cash_flow":
            "Return only the operating cash flow for 2024.",

        "debt":
            "Return only the total debt for 2024.",

        "operating_margin":
            "Return only the operating margin percentage for 2024. Do not calculate.",

        "r_and_d_expense":
            "Return only the research and development expense for 2024."
    }
    
    results = {}
    
    for metric, question in questions.items():
        
        # print(f"Extracting {metric}...")
        
        answer = extract_metric(
            metric=metric,
            question=question,
            company=company,
            user_id=user_id
        )
        
        results[metric] = answer
        
    return results