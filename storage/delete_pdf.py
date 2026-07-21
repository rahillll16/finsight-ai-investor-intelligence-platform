import glob
import os


def delete_pdf(
    company: str,
    year: int,
    user_id: int
):
    pattern = (
        f"data/raw_pdfs/{user_id}_{company}_{year}_*.pdf"
    )

    files = glob.glob(pattern)

    for file in files:
        if os.path.exists(file):
            os.remove(file)