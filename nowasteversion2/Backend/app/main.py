from fastapi import FastAPI,Depends
from app.schema import Ingredient
from app.models.pantry import Ingredient as IngredientModel
from app.database import get_db,ENGINE,Base
from sqlalchemy import select
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=ENGINE)
@app.get("/")
def home(): 
    return{
        "message":"Hello Girl",
        
    }
    
@app.post("/Ingredient")
async def createIngredient(ingredient:Ingredient,db=Depends(get_db)):
    db_ingredients=IngredientModel(
    name=ingredient.name,
    quantity=ingredient.quantity,
    unit=ingredient.unit,
    expiry_date=ingredient.expiry_date
    )
    db.add(db_ingredients)
    db.commit()
    db.refresh(db_ingredients)
    return db_ingredients
@app.get("/Ingredient")  
async def getIngredients(db=Depends(get_db)):
    statement=select(IngredientModel)
    ingredients=db.scalars(statement).all()
    return ingredients
