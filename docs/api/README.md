# API Reference

The backend exposes REST endpoints under the `/api` namespace. Key routes implemented in the current scaffold:

- `POST /api/uploads` — accept page images and create an OCR pipeline job.
- `GET /api/jobs/{job_id}` — retrieve pipeline progress updates.
- `GET /api/cards` — list generated decks.
- `GET /api/cards/{deck_id}` — fetch a specific deck with cards.

Future iterations will expand this document with detailed request/response schemas generated from FastAPI's OpenAPI spec.
