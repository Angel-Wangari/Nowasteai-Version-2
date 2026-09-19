from fastapi import FastAPI
from app.schema import Ingredient

app=FastAPI()

@app.get("/")
def home():
    return{
        "message":"Hello Girl",
        
    }
    
@app.post("/Ingredient")
async def createIngredient(ingredient:Ingredient):
    return{
    "name":ingredient.name,
    "quantity":ingredient.quantity,
    "unit":ingredient.unit,
    "expiry_date":ingredient.expiry_date
    }
    
