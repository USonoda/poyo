import { NextResponse } from "next/server";

interface Params {
  params: {
    deckId: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  const response = await fetch(`${process.env.BACKEND_URL ?? "http://localhost:8000"}/api/cards/${params.deckId}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Deck not found" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
