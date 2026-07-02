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


10. Cleanup Backlog

- Replace deprecated HuggingFace embeddings
- Move to async endpoints
- Add try-except blocks
- Add dependency injection
- Add service layer
- Improve KPI extraction accuracy
- Add structured logging
- Refactor architecture


11.  Authentication Cleanup Backlog

## Security

* Replace integer IDs with UUIDs.
* Move SECRET_KEY generation to deployment pipeline.
* Add Refresh Token support.
* Add Access Token rotation.
* Enable secure=True cookies in production.
* Add SameSite=Strict in production.
* Add CSRF protection for cookie-based authentication.

## Architecture

* Add Repository Layer for authentication.
* Add Service Layer for authentication logic.
* Use FastAPI dependency injection for database sessions.
* Centralize exception handling.

## Features

* Forgot Password functionality.
* Password Reset via Email.
* Email Verification.
* User Profile Management.
* Role-Based Access Control (RBAC).

## Monitoring

* Authentication logging.
* Failed login tracking.
* Suspicious activity detection.
* Rate limiting on login endpoint.

## Database

* Migrate User IDs to UUIDs.
* Add created_at and updated_at timestamps.
* Add last_login timestamp.

```
```

# Cleanup / Optimization Backlog

To be completed during final polishing phase.

## Frontend Cleanup

### UI/UX

- Improve Landing Page visuals
- Add animations using Framer Motion
- Improve spacing consistency
- Add dark/light theme support
- Add responsive mobile layouts
- Add skeleton loaders
- Add toast notifications
- Add empty states

---

### Authentication

- Add profile dropdown
- Add forgot password flow
- Add remember me option
- Add token refresh mechanism

---

### Dashboard

- Replace placeholders with real AI insights
- Add charts and visualizations
- Add financial trend analysis
- Add KPI formatting utilities
- Add dashboard filters

---

### Code Quality

- Convert API calls into service layer
- Add custom hooks

Example:

```text
useDashboard()
useAuth()
```

- Add reusable UI components
- Add global error boundary
- Add TypeScript (optional future upgrade)

---

### Backend Cleanup

- Convert all routes to async
- Add dependency injection
- Add structured logging
- Add centralized exception handling
- Add service layer architecture
- Add caching layer
- Optimize retrieval latency

---

### RAG Improvements

- Improve KPI extraction accuracy
- Add agentic workflows
- Add citations in responses
- Add conversation memory
- Add source attribution
- Add financial summarization pipeline

---


## Frontend

- [ ] Responsive dashboard layout.
- [ ] Active sidebar navigation highlighting.
- [ ] Empty states for dashboard.
- [ ] Skeleton loaders.
- [ ] Better loading animations.
- [ ] Auto-scroll chat messages.
- [ ] Chat typing animation.
- [ ] Improve chat UX/personality.
- [ ] Add toast notifications.

---

## Dashboard

- [ ] Clean KPI extraction.
- [ ] Add trend indicators.
- [ ] Add charts.
- [ ] Add company logos.
- [ ] Add AI-generated summary from actual metrics.

---

## Comparison

- [ ] Connect real API.
- [ ] Add comparison table.
- [ ] Add risk score visualization.
- [ ] Add green/red metric highlighting.
- [ ] Add comparison charts.

---

## Upload System

- [ ] Upload report UI.
- [ ] Upload API.
- [ ] Automatic ingestion.
- [ ] Automatic KPI extraction.
- [ ] Save metrics automatically.
- [ ] Progress indicator.

---

## RAG

- [ ] Improve retrieval quality.
- [ ] Better query expansion.
- [ ] Section-aware chunking.
- [ ] Conversation memory.
- [ ] Citation support.

---

## Backend

- [ ] Database migrations using Alembic.
- [ ] Centralized error handling.
- [ ] Logging.
- [ ] Background task queue.

---