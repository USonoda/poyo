import { notFound } from "next/navigation";
import { CardDeckView } from "@/features/cards/card-deck-view";

interface LearningCardDto {
  id: string;
  summary: string;
  source_text: string;
  quiz_question: string;
  quiz_options: string[];
  quiz_answer_index: number;
}

interface CardDeckDto {
  id: string;
  title: string;
  source_name: string;
  updated_at: string;
  cards: LearningCardDto[];
}

interface DeckPageProps {
  params: {
    deckId: string;
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/cards/${params.deckId}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    notFound();
  }

  const deck = (await response.json()) as CardDeckDto;
  return <CardDeckView deck={deck} />;
}
