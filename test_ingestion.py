from ingestion.ingest_document import ingest_document

result = ingest_document(
    pdf_path="data/raw_pdfs/2024_tesla.pdf",
    company="Tesla",
    year=2024
)

print(result)