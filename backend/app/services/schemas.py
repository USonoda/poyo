from __future__ import annotations

from enum import Enum
from typing import List

from pydantic import BaseModel


class StepStatus(str, Enum):
  PENDING = "pending"
  RUNNING = "running"
  COMPLETE = "complete"
  FAILED = "failed"


class PipelineStep(BaseModel):
  id: str
  label: str
  status: StepStatus
  message: str | None = None


class JobStatus(BaseModel):
  job_id: str
  steps: List[PipelineStep]
  completed: bool

  class Config:
    json_schema_extra = {
      "example": {
        "job_id": "job_123",
        "steps": [
          {"id": "upload", "label": "Upload", "status": "complete"},
          {"id": "ocr", "label": "OCR", "status": "running"},
        ],
        "completed": False,
      }
    }
