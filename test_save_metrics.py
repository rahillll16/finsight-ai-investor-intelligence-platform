from rag.kpi_extractor_rag import extract_kpis
from database.save_metrics import save_metrics

metrics = extract_kpis("Tesla")

save_metrics(
    metrics=metrics,
    company="Tesla",
    year=2024
)