from fastapi import APIRouter, Depends, HTTPException

from ...repositories.cards import CardRepository, get_card_repository
from ...schemas.cards import CardDeck

router = APIRouter(prefix="/cards", tags=["cards"])


@router.get("", response_model=list[CardDeck])
async def list_decks(repository: CardRepository = Depends(get_card_repository)) -> list[CardDeck]:
  return await repository.list_decks()


@router.get("/{deck_id}", response_model=CardDeck)
async def get_deck(deck_id: str, repository: CardRepository = Depends(get_card_repository)) -> CardDeck:
  try:
    return await repository.get_deck(deck_id)
  except ValueError as exc:  # pragma: no cover - simple mapping
    raise HTTPException(status_code=404, detail="Deck not found") from exc
