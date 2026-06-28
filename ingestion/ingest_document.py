import os

from ingestion.pdf_to_markdown import convert_pdf_to_markdown
from ingestion.semantic_chunker import chunk_document

from llm.openai_client import get_embedding_model

from vectorstore.chroma_db import get_collection


def ingest_document(
    pdf_path: str,
    company: str,
    year: int
):
    # PDF -> Markdown -> Chunk -> Embedding -> ChromaDB
    
    print("Converting PDF to markdown...")
    
    markdown_path = convert_pdf_to_markdown(pdf_path)
    
    print("Reading markdown file...")
    
    with open(markdown_path, "r", encoding="utf-8") as file:
        markdown_text = file.read()
        
    print("Generating semantic chunks...")
    
    documents = chunk_document(markdown_text)
    
    print(f"Generated semantic chunks...")
    
    embedding_model = get_embedding_model()
    
    collection = get_collection()
    
    print("Storing chunks in chromaDB...")
    
    for idx, doc in enumerate(documents):
        
        embedding = embedding_model.embed_query(
            doc.page_content
        )
        
        collection.add(
            ids=[f"{company}_{year}_{idx}"],
            documents=[doc.page_content],
            embeddings=[embedding],
            
            metadatas=[
                {
                    "company": company,
                    "year": year,
                    "source": os.path.basename(pdf_path)
                }
            ]
        )
        
    print("Document ingestion completed successfully.")
    
    return {
        "company": company,
        "year": year,
        "chunks": len(documents)
    }