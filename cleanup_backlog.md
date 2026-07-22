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

# 🧹 Cleanup / Tomorrow Backlog

## Highest Priority

- [ ] Finish upload pipeline.
- [ ] Call `extract_kpis()` after ingestion.
- [ ] Automatically save extracted metrics.
- [ ] Accept company and year dynamically from frontend.
- [ ] Redirect to dashboard after successful upload.

---

## Dashboard

- [ ] Show `N/A` instead of `NOT_FOUND`.
- [ ] Calculate Operating Margin from extracted values.
- [ ] Improve KPI formatting.
- [ ] Dynamic AI Summary.

---

## Comparison

- [ ] Connect comparison page to real backend.
- [ ] Risk score visualization.
- [ ] Green/red highlighting.
- [ ] Better comparison table.
- [ ] Add charts.

---

## Chat

- [ ] Friendlier assistant personality.
- [ ] Markdown rendering.
- [ ] Suggested prompts.
- [ ] Typing animation.
- [ ] Auto-scroll.

---

## Upload UI

- [ ] Upload page.
- [ ] Company selector.
- [ ] Year selector.
- [ ] Progress indicator.
- [ ] Success notification.

---

## Final Polish

- [ ] Loading skeletons.
- [ ] Responsive improvements.
- [ ] Active sidebar.
- [ ] Better error handling.
- [ ] Toast notifications.


# Add DELETE REPORTS


---


# 🧹 Cleanup Backlog

## Frontend

- Remove old comparison table.
- Remove temporary comparison bar UI.
- Remove unused comparison components.
- Remove unused imports.
- Check console warnings.
- Remove commented code.
- Format files consistently.

## Backend

- Clean comparison helper utilities.
- Organize AI prompts.
- Standardize API responses.
- Remove debug prints.
- Improve error handling consistency.

## General

- Verify full Upload → Dashboard flow.
- Check project folder cleanup.
- Verify environment variables.
- Review API naming consistency.

---


# 🧹 Cleanup Backlog

## Comparison

- Improve Recommendation Card typography.
- Increase recommendation badge prominence.
- Add loading animation while AI generates comparison.
- Replace loading text with professional loading card.

---

## Chat

- Implement AI chat backend.
- Add typing indicator.
- Auto-scroll to latest message.
- Support Enter to send messages.
- Improve error handling.
- Add markdown rendering for AI responses.

---

## General

- Remove unused comparison components if no longer needed.
- Remove unused imports.
- Review console warnings.
- Final responsive testing.
- Code formatting and cleanup.

---

# 🧹 Cleanup Backlog

## High Priority

- [ ] Replace browser alerts with toast notifications.
- [ ] Replace `window.confirm()` with a custom confirmation modal.
- [ ] Add loading state while deleting reports.
- [ ] Add empty dashboard state when no reports exist.
- [ ] Improve API error messages.

---

## Medium Priority

- [ ] Remove unused imports.
- [ ] Improve code comments and documentation.
- [ ] Standardize API response format.
- [ ] Improve responsive layout.

---

## Low Priority

- [ ] Add upload timestamps.
- [ ] Improve dashboard animations.
- [ ] Improve spacing consistency.
- [ ] Add report statistics.

---

# 🧹 Cleanup Backlog

## Dashboard
- Add interactive financial charts (Revenue, Net Income, Cash Flow, Debt).
- Improve responsive layout for tablets and mobile devices.
- Add smooth loading states for AI Chat and Company Comparison.
- Add subtle page entrance animations.

## AI Features
- Display AI-generated strengths and risks using dedicated cards.
- Improve markdown rendering in AI Chat.
- Add copy-to-clipboard functionality for AI responses.

## Code Quality
- Remove unused imports.
- Remove commented-out code.
- Refactor repeated Tailwind utility classes.
- Review component organization for consistency.

## Documentation
- Write a professional `README.md`.
- Add architecture diagram.
- Capture updated dashboard screenshots.
- Create a short demo video/GIF.

## Deployment
- Deploy frontend.
- Deploy backend.
- Configure production environment variables.
- Perform end-to-end testing on the deployed application.

---