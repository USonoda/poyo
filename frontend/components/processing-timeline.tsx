"use client";

import { useEffect, useState } from "react";

interface JobStep {
  id: string;
  label: string;
  status: "pending" | "running" | "complete" | "failed";
  message?: string;
}

interface ProcessingTimelineProps {
  jobId: string | null;
}

const BASE_STEPS: JobStep[] = [
  { id: "upload", label: "Upload", status: "pending" },
  { id: "ocr", label: "OCR", status: "pending" },
  { id: "chunk", label: "Chunk paragraphs", status: "pending" },
  { id: "cards", label: "Generate cards", status: "pending" }
];

function cloneSteps() {
  return BASE_STEPS.map((step) => ({ ...step }));
}

export function ProcessingTimeline({ jobId }: ProcessingTimelineProps) {
  const [steps, setSteps] = useState<JobStep[]>(() => cloneSteps());

  useEffect(() => {
    if (!jobId) {
      setSteps(cloneSteps());
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      if (cancelled) {
        return;
      }

      const response = await fetch(`/api/jobs/${jobId}`, { cache: "no-store" });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if (!cancelled) {
        setSteps(data.steps as JobStep[]);
        if (!data.completed) {
          timeoutId = setTimeout(poll, 3000);
        }
      }
    };

    void poll();

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [jobId]);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow">
      <h2 className="text-xl font-semibold">Processing pipeline</h2>
      {!jobId ? (
        <p className="mt-3 text-sm text-slate-400">
          Upload files to monitor OCR, chunking and card generation progress.
        </p>
      ) : (
        <ol className="mt-6 space-y-4">
          {steps.map((step) => (
            <li key={step.id} className="flex items-start gap-3">
              <span
                className={`mt-1 inline-flex h-3 w-3 rounded-full border border-slate-700 ${
                  step.status === "complete"
                    ? "bg-emerald-400"
                    : step.status === "running"
                      ? "bg-amber-400"
                      : step.status === "failed"
                        ? "bg-red-500"
                        : "bg-slate-800"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-slate-100">{step.label}</p>
                <p className="text-xs text-slate-400">
                  {step.status === "pending" && "Waiting"}
                  {step.status === "running" && "Processing"}
                  {step.status === "complete" && "Complete"}
                  {step.status === "failed" && (step.message ?? "Failed")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
