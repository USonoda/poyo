from __future__ import annotations

from typing import Annotated

from fastapi import Depends, UploadFile

from .schemas import JobStatus, PipelineStep, StepStatus
from backend.workers.registry import JobQueue, get_job_queue


class PipelineService:
  """Coordinates OCR, chunking and card generation jobs."""

  def __init__(self, queue: JobQueue) -> None:
    self._queue = queue

  async def enqueue(self, files: list[UploadFile]) -> JobStatus:
    job_id = await self._queue.enqueue(files)
    return JobStatus(
      job_id=job_id,
      steps=[
        PipelineStep(id="upload", label="Upload", status=StepStatus.COMPLETE),
        PipelineStep(id="ocr", label="OCR", status=StepStatus.RUNNING),
        PipelineStep(id="chunk", label="Chunk paragraphs", status=StepStatus.PENDING),
        PipelineStep(id="cards", label="Generate cards", status=StepStatus.PENDING),
      ],
      completed=False,
    )


def pipeline_service(queue: Annotated[JobQueue, Depends(get_job_queue)]) -> PipelineService:
  return PipelineService(queue)
