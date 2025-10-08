import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.BACKEND_URL ?? "http://localhost:8000"}/api/cards`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json([], { status: 200 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
