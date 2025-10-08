from fastapi import APIRouter, Depends, File, UploadFile

from ...services.pipeline import pipeline_service
from ...services.schemas import JobStatus

router = APIRouter(prefix="/uploads", tags=["uploads"])


@router.post("", response_model=JobStatus)
async def create_upload_job(
  files: list[UploadFile] = File(...),
  service = Depends(pipeline_service),
) -> JobStatus:
  """Accept files and enqueue an OCR + card generation job."""
  job = await service.enqueue(files)
  return job
