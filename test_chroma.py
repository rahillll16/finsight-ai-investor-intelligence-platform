from vectorstore.chroma_db import get_collection

collection = get_collection()

print(collection.name)