import Link from "next/link";

interface CardDeckDto {
  id: string;
  title: string;
  source_name: string;
  updated_at: string;
  cards: unknown[];
}

async function fetchDecks(): Promise<CardDeckDto[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/cards`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as CardDeckDto[];
}

export async function CardsOverview() {
  const decks = await fetchDecks();

  if (decks.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        No decks yet. Upload book pages to generate your first learning cards.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {decks.map((deck) => (
        <article
          key={deck.id}
          className="flex flex-col space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow"
        >
          <header className="space-y-1">
            <h3 className="text-lg font-semibold text-emerald-300">{deck.title}</h3>
            <p className="text-xs text-slate-400">Source: {deck.source_name}</p>
          </header>
          <p className="text-sm text-slate-200">
            {deck.cards.length} cards • Updated {new Date(deck.updated_at).toLocaleString()}
          </p>
          <Link
            href={`/cards/${deck.id}`}
            className="mt-auto inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Open deck
          </Link>
        </article>
      ))}
    </div>
  );
}
