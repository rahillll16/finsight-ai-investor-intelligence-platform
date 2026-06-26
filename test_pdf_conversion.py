from ingestion.pdf_to_markdown import convert_pdf_to_markdown

markdown_path = convert_pdf_to_markdown(
    "data/raw_pdfs/2024_tesla.pdf"
)

print("Markdown save at:\n", markdown_path )