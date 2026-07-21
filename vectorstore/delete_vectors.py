from vectorstore.chroma_db import get_collection


def delete_vectors(
    company: str,
    year: int,
    user_id: int
):
    collection = get_collection()

    collection.delete(
        where={
            "$and": [
                {"company": company},
                {"year": year},
                {"user_id": user_id}
            ]
        }
    )