from ingestion.semantic_chunker import chunk_document

with open(
    "data/markdown/2024_tesla.md",
    "r",
    encoding="utf-8"
) as file:
    markdown_text = file.read()
    
documents = chunk_document(markdown_text)

print(f"Total Chunks: {len(documents)}")

print("\n First Chunk:\n")
print(documents[0].page_content[:1000])