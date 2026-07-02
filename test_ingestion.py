from ingestion.ingest_document import ingest_document

result = ingest_document(
    pdf_path="data/raw_pdfs/2024_tesla.pdf",
    company="Tesla",
    year=2024,
    user_id=1

)

result = ingest_document(
    pdf_path="data/raw_pdfs/2024_microsoft.pdf",
    company="Microsoft",
    year=2024,
    user_id=1

)

result = ingest_document(
    pdf_path="data/raw_pdfs/2024_apple.pdf",
    company="Apple",
    year=2024,
    user_id=1

)

print("all done")