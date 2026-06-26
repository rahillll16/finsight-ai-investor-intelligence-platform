import os
import pymupdf4llm

def convert_pdf_to_markdown(pdf_path: str) -> str:
    
    markdown_content = pymupdf4llm.to_markdown(pdf_path)
    
    if isinstance(markdown_content, list):
        markdown_content = "\n".join(
            str(page) for page in markdown_content
        )
    
    os.makedirs("data/markdown", exist_ok=True)
    
    file_name = os.path.basename(pdf_path).replace(".pdf",".md")
    
    markdown_path = os.path.join(
        "data",
        "markdown",
        file_name
    )
    
    with open(markdown_path, "w", encoding="utf-8") as file:
        file.write(markdown_content)
        
    return markdown_path