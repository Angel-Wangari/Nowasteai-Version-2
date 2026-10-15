from dotenv import load_dotenv
from groq import Groq
load_dotenv(".env")
client=Groq()
try:
    response=client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
        {
            "role":"user",
            "content":"Suggest one simple meal with eggs and tomatoes"
        }
    ],
    max_tokens=300
    )
    print(response.choices[0].message.content)
except Exception as error:
    print("Groq failed request:",error)
    