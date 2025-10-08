from __future__ import annotations

from typing import List

from pydantic import BaseModel


class LearningCard(BaseModel):
  id: str
  summary: str
  source_text: str
  quiz_question: str
  quiz_options: List[str]
  quiz_answer_index: int


class CardDeck(BaseModel):
  id: str
  title: str
  source_name: str
  updated_at: str
  cards: List[LearningCard]
