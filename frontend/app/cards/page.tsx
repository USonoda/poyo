import { Suspense } from "react";
import { CardsOverview } from "@/features/cards/cards-overview";

export default function CardsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Generated decks</h2>
        <p className="mt-2 text-sm text-slate-300">
          Each deck contains summaries, a Q&A chat and quick quizzes based on
          your uploaded content.
        </p>
      </header>
      <Suspense fallback={<p className="text-sm text-slate-400">Loading cards...</p>}>
        <CardsOverview />
      </Suspense>
    </section>
  );
}
