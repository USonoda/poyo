# Poyo Hands-on Reader

Poyo is a prototype platform that transforms textbook pages into interactive learning cards. Users upload page images, the system performs OCR and semantic chunking, and study decks are generated with summaries, chat prompts and quizzes.

## Project Structure

```
frontend/   # Next.js app router UI for uploading and studying cards
backend/    # FastAPI API + Celery pipeline services
infra/      # Dockerfiles and docker-compose for local development
docs/       # Architecture notes, API documentation and prompt drafts
scripts/    # Developer utilities
```

## Getting Started

1. Copy `.env.example` to `.env` and adjust secrets. Leave `NEXT_PUBLIC_API_BASE_URL` blank to default to same-origin requests.
2. Run `scripts/bootstrap.sh` to install dependencies.
3. Start the stack via Docker Compose:
   ```bash
   cd infra
   docker compose up --build
   ```
4. Access the frontend at http://localhost:3000 and backend docs at http://localhost:8000/docs.

## Status

This repository currently ships a scaffold with mocked data sources and background job simulation. Replace the in-memory services with production-ready implementations to move beyond the prototype stage.
