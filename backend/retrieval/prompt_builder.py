import json

def build_multimodal_prompt(chunks, query: str):
    prompt = f"""Based on the following documents, answer the question:

QUESTION:
{query}

DOCUMENTS:
"""

    for i, chunk in enumerate(chunks):
        prompt += f"\n--- Document {i+1} ---\n"

        if "original_content" in chunk.metadata:
            data = json.loads(chunk.metadata["original_content"])

            if data.get("raw_text"):
                prompt += f"TEXT:\n{data['raw_text']}\n\n"

            for j, table in enumerate(data.get("tables_html", [])):
                prompt += f"TABLE {j+1}:\n{table}\n\n"

    prompt += """
If the answer is not present, say so clearly.

ANSWER:
"""
    return prompt
