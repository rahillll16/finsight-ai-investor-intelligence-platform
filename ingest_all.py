from ingestion.ingest_document import ingest_document

documents = [
    {
        "path": "data/raw_pdfs/2024_tesla.pdf",
        "company": "Tesla",
        "year": 2024
    },
    {
        "path": "data/raw_pdfs/2024_apple.pdf",
        "company": "Apple",
        "year": 2024
    },
    {
        "path": "data/raw_pdfs/2024_microsoft.pdf",
        "company": "Microsoft",
        "year": 2024
    }
]

for doc in documents:

    print(f"\nProcessing {doc['company']}...\n")

    ingest_document(
        pdf_path=doc["path"],
        company=doc["company"],
        year=doc["year"],
        user_id= 1
    )

print("\nAll documents ingested successfully.")