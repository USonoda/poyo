"use client";

import { useState } from "react";
import { UploadDropzone } from "@/components/upload-dropzone";
import { ProcessingTimeline } from "@/components/processing-timeline";

export default function UploadPage() {
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow">
        <h2 className="text-xl font-semibold">Upload book images</h2>
        <p className="mt-2 text-sm text-slate-300">
          Supported formats: JPG, PNG and PDF. Files are stored securely for OCR
          processing.
        </p>
        <UploadDropzone onJobCreated={setJobId} />
      </section>
      <ProcessingTimeline jobId={jobId} />
    </div>
  );
}
