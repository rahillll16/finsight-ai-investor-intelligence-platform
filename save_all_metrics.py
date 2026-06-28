from rag.kpi_extractor_rag import extract_kpis
from database.save_metrics import save_metrics

companies = [
    "Tesla",
    "Apple",
    "Microsoft"
]

for company in companies:

    print(f"Extracting KPIs for {company}...")

    metrics = extract_kpis(company)

    save_metrics(
        metrics=metrics,
        company=company,
        year=2024
    )

print("All metrics saved successfully.")