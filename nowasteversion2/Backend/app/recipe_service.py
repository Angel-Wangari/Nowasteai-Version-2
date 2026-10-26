from dotenv import load_dotenv
from groq import Groq
import json

load_dotenv()
client = Groq()


def generate_recipe(prompt: str) -> dict:
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You generate practical recipes. "
                    "Return only valid JSON with these keys: "
                    "name, ingredients and instructions. "
                    "Each ingredient must have name, quantity and unit. "
                    "Instructions must be a list of strings. "
                    "Do not include markdown or text outside the JSON."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=12000
    )

    recipe_text = response.choices[0].message.content

    if not recipe_text:
        raise ValueError("The AI returned an empty recipe.")

    return json.loads(recipe_text)