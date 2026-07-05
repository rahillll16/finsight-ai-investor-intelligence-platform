import re


def parse_metric(context: str) -> str | None:

    pattern = r"\$?\d[\d,]*(?:\.\d+)?\s?(?:million|billion|%)?"

    matches = re.findall(
        pattern,
        context,
        flags=re.IGNORECASE
    )

    if matches:
        return matches[0]

    return None