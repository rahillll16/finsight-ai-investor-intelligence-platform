from rag.kpi_extractor_rag import extract_kpis
from database.save_metrics import save_metrics

companies = [
    "Tesla",
    "Apple",
    "Microsoft"
]

for company in companies:

    # print(f"Extracting KPIs for {company}...")

    metrics = extract_kpis(company,1)

    save_metrics(
        metrics=metrics,
        company=company,
        year=2024,
        user_id=1
    )

print("All metrics saved successfully.")