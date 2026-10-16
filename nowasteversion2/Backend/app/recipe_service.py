from dotenv import load_dotenv
from groq import Groq
load_dotenv()
client=Groq()
def generate_recipe(prompt:str)->str:
    response=client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
            "role":"user",
            "content":prompt
            }
        ],
        max_tokens=12000
    )
    
    return response.choices[0].message.content