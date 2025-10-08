from __future__ import annotations

import asyncio
import uuid
from dataclasses import dataclass, field

from ..services.schemas import JobStatus, PipelineStep, StepStatus


@dataclass
class JobRegistry:
  _jobs: dict[str, JobStatus] = field(default_factory=dict)

  async def store(self, job: JobStatus) -> None:
    self._jobs[job.job_id] = job

  async def update_step(self, job_id: str, step_id: str, status: StepStatus) -> None:
    job = self._jobs[job_id]
    for step in job.steps:
      if step.id == step_id:
        step.status = status
        break
    self._jobs[job_id] = job

  async def mark_complete(self, job_id: str) -> None:
    job = self._jobs[job_id]
    for step in job.steps:
      if step.status != StepStatus.COMPLETE:
        step.status = StepStatus.COMPLETE
    job.completed = True
    self._jobs[job_id] = job

  async def get(self, job_id: str) -> JobStatus | None:
    return self._jobs.get(job_id)


REGISTRY = JobRegistry()


@dataclass
class JobQueue:
  _registry: JobRegistry = REGISTRY

  async def enqueue(self, files: list) -> str:  # noqa: ANN401
    job_id = f"job-{uuid.uuid4().hex[:8]}"
    steps = [
      PipelineStep(id="upload", label="Upload", status=StepStatus.COMPLETE),
      PipelineStep(id="ocr", label="OCR", status=StepStatus.RUNNING),
      PipelineStep(id="chunk", label="Chunk paragraphs", status=StepStatus.PENDING),
      PipelineStep(id="cards", label="Generate cards", status=StepStatus.PENDING),
    ]
    job = JobStatus(job_id=job_id, steps=steps, completed=False)
    await self._registry.store(job)
    asyncio.create_task(self._simulate_progress(job_id))
    return job_id

  async def _simulate_progress(self, job_id: str) -> None:
    await asyncio.sleep(1)
    await self._registry.update_step(job_id, "ocr", StepStatus.COMPLETE)
    await self._registry.update_step(job_id, "chunk", StepStatus.RUNNING)
    await asyncio.sleep(1)
    await self._registry.update_step(job_id, "chunk", StepStatus.COMPLETE)
    await self._registry.update_step(job_id, "cards", StepStatus.RUNNING)
    await asyncio.sleep(1)
    await self._registry.update_step(job_id, "cards", StepStatus.COMPLETE)
    await self._registry.mark_complete(job_id)


QUEUE = JobQueue()


async def get_job_registry() -> JobRegistry:
  return REGISTRY


async def get_job_queue() -> JobQueue:
  return QUEUE
