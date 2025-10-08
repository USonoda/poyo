from fastapi import APIRouter, Depends, HTTPException

from ...services.schemas import JobStatus
from backend.workers.registry import JobRegistry, get_job_registry

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/{job_id}", response_model=JobStatus)
async def get_job(job_id: str, registry: JobRegistry = Depends(get_job_registry)) -> JobStatus:
  job = await registry.get(job_id)
  if not job:
    raise HTTPException(status_code=404, detail="Job not found")
  return job
