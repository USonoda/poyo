FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app
COPY backend ./backend
RUN pip install --upgrade pip && pip install -e "./backend[dev]"
CMD ["celery", "-A", "backend.workers.celery_app", "worker", "-l", "info"]
