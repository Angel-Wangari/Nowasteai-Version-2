
import requests

BASE_URL = "http://127.0.0.1:8000"


response = requests.post(f"{BASE_URL}/GenerateRecipe")

if response.status_code != 200:
    print("Recipe generation failed:", response.text)
    raise SystemExit

recipe = response.json()["recipe"]


print("\nRecipe:", recipe["name"])

print("\nIngredients:")
for ingredient in recipe["ingredients"]:
    print(
        f"- {ingredient['name']}: "
        f"{ingredient['quantity']} {ingredient['unit']}"
    )

print("\nInstructions:")
for number, instruction in enumerate(recipe["instructions"], start=1):
    print(f"{number}. {instruction}")

answer = input("\nDid you make this recipe? (yes/no): ").strip().lower()

if answer not in ("yes", "no"):
    print("Please enter yes or no.")
    raise SystemExit


confirmation = {
    "made": answer == "yes",
    "recipe": recipe
}

response = requests.post(
    f"{BASE_URL}/ConfirmRecipe",
    json=confirmation
)

print("\nStatus code:", response.status_code)
print("Response:", response.text)
