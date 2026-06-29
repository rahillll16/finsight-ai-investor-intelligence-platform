from rag.rag_pipeline import ask_question

questions = [
    "What was the company's total revenue in 2024?",
    "What was the company's net income in 2024?",
    "What was the company's research and development expense in 2024?"
]

companies = ["Tesla", "Apple", "Microsoft"]

for company in companies:

    print(f"\n{'='*50}")
    print(f"Company: {company}")
    print(f"{'='*50}")

    for question in questions:

        print(f"\nQuestion: {question}")

        answer = ask_question(
            question=question,
            company=company
        )

        print(f"Answer: {answer}")