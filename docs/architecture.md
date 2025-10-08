# Poyo Hands-on Reader Architecture

This document summarizes the current high-level architecture for the Poyo platform. The system ingests textbook page images, performs OCR + semantic chunking and exposes interactive study cards.

## Components

- **Frontend (Next.js)** — handles uploads, displays card decks and interactive study experience.
- **Backend API (FastAPI)** — orchestrates jobs, stores card data and exposes REST endpoints for the frontend.
- **Worker Pipeline (Celery)** — executes OCR, chunking and LLM augmentation asynchronously.
- **Data Stores** — PostgreSQL for structured data, Redis for Celery broker/result backend, object storage (S3-compatible) for raw files.

## Processing Flow

1. Users upload page images via the frontend uploader.
2. The backend saves files to storage and enqueues a Celery task pipeline.
3. Worker tasks run sequentially: OCR → semantic chunking → card generation (summary, chat seed data, quizzes).
4. Results are persisted and exposed through the cards API to the frontend UI.

## Future Enhancements

- Replace in-memory repositories with PostgreSQL implementations.
- Add authentication / user accounts to personalize learning history.
- Integrate production-grade OCR/LLM providers with retry + monitoring.
- Implement streaming updates via WebSockets for real-time job progress.
