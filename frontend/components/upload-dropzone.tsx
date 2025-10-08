"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";

interface UploadDropzoneProps {
  onJobCreated: (jobId: string) => void;
}

export function UploadDropzone({ onJobCreated }: UploadDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onJobCreated(data.jobId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-lg border border-dashed border-emerald-500/60 bg-slate-900/80 p-6">
      <label className="flex cursor-pointer flex-col items-center justify-center space-y-3 text-center">
        <span className="text-sm text-slate-300">
          Drop files here or click to select
        </span>
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*,.pdf"
          onChange={handleUpload}
        />
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          {isUploading ? "Uploading..." : "Select files"}
        </span>
      </label>
      {error ? <p className="mt-3 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
