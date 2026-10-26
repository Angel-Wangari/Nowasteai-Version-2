import requests

recipe = {
    "name": "Test Pancakes",
    "ingredients": [
        {"name": "Baking Flour", "quantity": 200, "unit": "g"},
        {"name": "Sugar", "quantity": 50, "unit": "g"}
    ],
    "instructions": ["Mix the ingredients."]
}

response = requests.post(
    "http://127.0.0.1:8000/ConfirmRecipe",
    json={
        "made": True,
        "recipe": recipe
    }
)

print("Status code:", response.status_code)
print("Response:", response.text)