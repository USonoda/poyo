import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const proxied = new FormData();
  formData.forEach((value, key) => {
    proxied.append(key, value);
  });

  const backendResponse = await fetch(`${process.env.BACKEND_URL ?? "http://localhost:8000"}/api/uploads`, {
    method: "POST",
    body: proxied
  });

  if (!backendResponse.ok) {
    return NextResponse.json({ message: "Failed to create job" }, { status: 500 });
  }

  const data = await backendResponse.json();
  return NextResponse.json({ jobId: data.job_id ?? data.jobId });
}
