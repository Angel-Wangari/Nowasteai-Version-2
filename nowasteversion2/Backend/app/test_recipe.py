import requests

response = requests.post("http://127.0.0.1:8000/GenerateRecipe")

print("Status code:", response.status_code)
print("Response:", response.text)