from fastapi import FastAPI

from .api.routes import cards, jobs, uploads

app = FastAPI(title="Poyo Hands-on Reader API")

app.include_router(uploads.router, prefix="/api")
app.include_router(jobs.router, prefix="/api")
app.include_router(cards.router, prefix="/api")


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
  return {"status": "ok"}
