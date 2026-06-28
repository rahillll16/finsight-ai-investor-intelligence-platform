from rag.kpi_extractor_rag import extract_kpis

kpis = extract_kpis("Tesla")

for metric, value in kpis.items():
    print(f"\n{metric.upper()}")
    print(value)