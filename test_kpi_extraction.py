from rag.kpi_extractor_rag import extract_kpis

kpis = extract_kpis("Tesla",user_id=1)

for metric, value in kpis.items():
    print(f"\n{metric.upper()}")
    print(value)