from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import List

from ..schemas.cards import CardDeck, LearningCard


@dataclass
class CardRepository:
  """Temporary in-memory repository."""

  _decks: List[CardDeck] | None = None

  async def list_decks(self) -> List[CardDeck]:
    return self._get_seed_data()

  async def get_deck(self, deck_id: str) -> CardDeck:
    for deck in self._get_seed_data():
      if deck.id == deck_id:
        return deck
    raise ValueError("Deck not found")

  def _get_seed_data(self) -> List[CardDeck]:
    if self._decks is None:
      now = datetime.utcnow().isoformat()
      self._decks = [
        CardDeck(
          id="deck-001",
          title="Sample Linear Algebra",
          source_name="Linear Algebra Book",
          updated_at=now,
          cards=[
            LearningCard(
              id="card-001",
              summary="Vectors and vector spaces basics",
              source_text="A vector space is a collection of vectors...",
              quiz_question="Which axiom ensures closure under scalar multiplication?",
              quiz_options=["Associativity", "Distributivity", "Scalar closure", "Additive inverse"],
              quiz_answer_index=2,
            )
          ],
        )
      ]
    return self._decks


async def get_card_repository() -> CardRepository:
  return CardRepository()
