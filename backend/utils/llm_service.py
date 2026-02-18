import json
import re
from config import settings


class LLMService:
    """
    Handles communication with Gemini.
    """

    def _clean_response(self, text: str) -> str:
        if not text:
            raise ValueError("Empty response from Gemini.")

        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text)

        return text.strip()

    def _extract_json(self, text: str) -> dict:
        start = text.find("{")
        end = text.rfind("}")

        if start == -1 or end == -1:
            raise ValueError("No valid JSON found in Gemini response.")

        json_text = text[start:end + 1]

        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse Gemini response as JSON.")

    def generate(self, prompt: str) -> dict:
        try:
            # ✅ Correct way to get client
            client = settings.get_gemini_client()

            response = client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt
            )

            if not response or not response.text:
                raise ValueError("Gemini returned empty response.")

            raw_text = response.text.strip()

            cleaned_text = self._clean_response(raw_text)

            parsed_json = self._extract_json(cleaned_text)

            return parsed_json

        except Exception as e:
            raise RuntimeError(f"Gemini API error: {str(e)}")
