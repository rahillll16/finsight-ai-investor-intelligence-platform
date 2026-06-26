from langchain_experimental.text_splitter import SemanticChunker

from langchain_core.documents import Document

from llm.openai_client import get_embedding_model

def chunk_document(markdown_text: str) -> list[Document]:
    
    embeddings = get_embedding_model()
    
    text_splitter = SemanticChunker(
        embeddings=embeddings
    )
    
    documents = text_splitter.create_documents(
        [markdown_text]
    )
    
    return documents