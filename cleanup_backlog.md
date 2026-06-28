Cleanup / Optimization Backlog

1. Replace deprecated HuggingFaceEmbeddings
   -> Use langchain-huggingface package

2. Load embedding model only once
   -> Avoid loading weights multiple times

3. Add proper logging instead of print statements

4. Improve exception handling across pipeline

5. Add input validation and type safety

6. Add caching for frequently used models

7. Refactor configuration management

8. Add unit tests for major modules

9. Improve KPI extraction accuracy

- Increase retrieved chunks from 3 → 10
- Add Hybrid Search (BM25)
- Add Reranker
- Add structured extraction prompts