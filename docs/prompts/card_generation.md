# Card Generation Prompt Draft

```
You are an assistant that creates interactive learning cards. Given the OCR extracted text chunk, respond with:
1. A concise summary (<= 3 sentences).
2. A Socratic question to reinforce understanding.
3. A multiple-choice quiz with 4 options and the index (0-based) of the correct answer.

Text:
{{chunk_text}}
```
