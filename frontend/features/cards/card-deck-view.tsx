"use client";

import { useEffect, useMemo, useState } from "react";

interface LearningCard {
  id: string;
  summary: string;
  source_text: string;
  quiz_question: string;
  quiz_options: string[];
  quiz_answer_index: number;
}

interface CardDeck {
  id: string;
  title: string;
  source_name: string;
  updated_at: string;
  cards: LearningCard[];
}

interface CardDeckViewProps {
  deck: CardDeck;
}

export function CardDeckView({ deck }: CardDeckViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [deck.id]);

  const cards = deck.cards ?? [];
  const card = useMemo(() => cards[currentIndex], [cards, currentIndex]);

  if (!card) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-sm text-slate-300">
        No cards available yet. Check back after processing finishes.
      </section>
    );
  }

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setIsCorrect(index === card.quiz_answer_index);
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-emerald-300">{deck.title}</h2>
        <p className="text-sm text-slate-400">Source: {deck.source_name}</p>
      </header>
      <article className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>
          <p className="mt-2 text-sm text-slate-200">{card.summary}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Quick quiz</h3>
          <p className="mt-2 text-sm text-slate-200">{card.quiz_question}</p>
          <div className="mt-4 space-y-3">
            {card.quiz_options.map((option, index) => {
              const isSelected = index === selectedOption;
              const correct = index === card.quiz_answer_index;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                    isSelected
                      ? correct
                        ? "border-emerald-400 bg-emerald-500/20"
                        : "border-red-400 bg-red-500/10"
                      : "border-slate-700 bg-slate-800/70 hover:border-emerald-500/60 hover:bg-slate-800"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {isCorrect != null ? (
            <p
              className={`mt-4 text-sm ${isCorrect ? "text-emerald-300" : "text-red-400"}`}
            >
              {isCorrect ? "Correct!" : "Try again."}
            </p>
          ) : null}
        </div>
        <details className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300">
          <summary className="cursor-pointer font-medium text-slate-200">Show source text</summary>
          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-slate-400">
            {card.source_text}
          </p>
        </details>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-500/60"
            onClick={() => {
              setSelectedOption(null);
              setIsCorrect(null);
              setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <span className="text-xs text-slate-400">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <button
            type="button"
            className="rounded-lg border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
            onClick={() => {
              setSelectedOption(null);
              setIsCorrect(null);
              setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
            }}
            disabled={currentIndex === cards.length - 1}
          >
            Next
          </button>
        </div>
      </article>
    </section>
  );
}
