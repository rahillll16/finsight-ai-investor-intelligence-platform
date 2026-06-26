from ingestion.semantic_chunker import chunk_document
from vectorstore.chroma_db import get_collection
from llm.openai_client import get_embedding_model

import uuid

with open(
    "data/markdown/2024_tesla.md",
    "r",
    encoding="utf-8"
) as file:
    markdown_text=file.read()
    
documents = chunk_document(markdown_text)

embedding_model = get_embedding_model()

collection = get_collection()

for idx, doc in enumerate(documents):
    
    embedding = embedding_model.embed_query(
        doc.page_content
    )
    
    collection.add(
        ids = [str(uuid.uuid4())],
        documents=[doc.page_content],
        embeddings=[embedding],
        metadatas=[
            {
                "source": "2024_tesla"
            }
        ]
    )
    
print(f"{len(documents)} chunks stored successfully.")