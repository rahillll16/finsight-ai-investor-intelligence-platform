from rag.rag_pipeline import ask_question

response = ask_question(
    question="What was the revenue in 2024?",
    company="Tesla"
)

print(response)