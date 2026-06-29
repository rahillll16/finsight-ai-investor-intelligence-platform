QUERY_EXPANSIONS = {
    "revenue": [
        "total revenue",
        "sales",
        "net sales",
        "total revenues"
    ],

    "net income": [
        "net earnings",
        "profit",
        "net profit",
        "income attributable to shareholders"
    ],

    "research and development": [
        "R&D expense",
        "research spending",
        "research and development expense",
        "R&D spending"
    ],

    "debt": [
        "total debt",
        "long-term debt",
        "borrowings",
        "debt obligations"
    ],

    "cash flow": [
        "operating cash flow",
        "cash provided by operating activities",
        "cash generated from operations"
    ]
}


def expand_query(query: str) -> str:

    expanded_query = query

    query_lower = query.lower()

    for keyword, synonyms in QUERY_EXPANSIONS.items():

        if keyword in query_lower:

            expanded_query += " " + " ".join(synonyms)

    return expanded_query