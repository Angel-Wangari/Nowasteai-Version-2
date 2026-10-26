from fastapi import FastAPI,Depends,HTTPException
from app.schema import Ingredient,KitchenEquipmentCreate,Recipe
from app.models.pantry import Ingredient as IngredientModel 
from app.models.equipment import KitchenEquipment
from app.database import get_db,ENGINE,Base
from app.recipe_service import generate_recipe
from app.unit_conversion import convert_quantity
from sqlalchemy import select
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

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
@app.delete("/Ingredient/{ingredient_id}")
def deleteIngredient(ingredient_id:int,db=Depends(get_db)):
    ingredient=db.get(IngredientModel,ingredient_id)
    if ingredient is None:
        raise HTTPException(
            status_code=404,
            detail="Ingredient not Found"
        )
    db.delete(ingredient)
    db.commit()
    return{"message":"Ingredient deleted successfully"}
@app.post("/Equipment")
def save_equipment(equipment:KitchenEquipmentCreate,db=Depends(get_db)):
    savedEquiment=db.query(KitchenEquipment).first()
    if savedEquiment is None:
        savedEquiment=KitchenEquipment()
        db.add(savedEquiment)
    savedEquiment.has_cooker=equipment.has_cooker
    savedEquiment.has_frying_pan=equipment.has_frying_pan
    savedEquiment.has_oven=equipment.has_oven
    savedEquiment.has_microwave=equipment.has_microwave
    savedEquiment.has_air_fryer=equipment.has_air_fryer
    savedEquiment.has_blender=equipment.has_blender
    db.commit()
    db.refresh(savedEquiment)
    return savedEquiment
@app.post("/GenerateRecipe")
def create_recipe(db=Depends(get_db)):
    statement=select(IngredientModel)
    ingredients=db.scalars(statement).all()
    saved_equipment=db.query(KitchenEquipment).first()
    if not ingredients:
        raise HTTPException(
            status_code=400,
            detail="Add ingredients to your pantry first."
        )

    today = date.today()

    usable_ingredients = [
        ingredient
        for ingredient in ingredients
        if ingredient.expiry_date >= today
    ]

    if not usable_ingredients:
        raise HTTPException(
            status_code=400,
            detail="All ingredients in your pantry have expired."
        )
    if saved_equipment is None:
        equipment_text="No Kitchen equipment has been added"
    else:
        equipment_items=[
            name
            for name,available in[
                ("cooker",saved_equipment.has_cooker),
                ("frying pan",saved_equipment.has_frying_pan),
                ("oven",saved_equipment.has_oven),
                ("microwave",saved_equipment.has_microwave),
                ("blender",saved_equipment.has_blender),
                ("air fryer",saved_equipment.has_air_fryer)
            ] if available
            
        ]
        equipment_text=", ".join(equipment_items)
        if not equipment_text:
            equipment_text = "No kitchen equipment is marked as available."
    
    ingredient_lines=[
    f"{ingredient.name}: {ingredient.quantity} {ingredient.unit} ,"
    f"expires {ingredient.expiry_date}"
    for ingredient in usable_ingredients
    ]
    pantry_text="\n".join(ingredient_lines)
    
    
    prompt = (
        "Generate one simple, practical recipe using the available pantry "
        "ingredients and kitchen equipment below.\n\n"
        f"Pantry ingredients:\n{pantry_text}\n\n"
        f"Available kitchen equipment: {equipment_text}\n\n"
        "Rules:\n"
        "- Use only the listed pantry ingredients, except water, salt and "
        "cooking oil which may be assumed available.\n"
        "- Never use expired ingredients.\n"
        "- Do not exceed the quantities available in the pantry.\n"
        "- Use only the listed kitchen equipment. Do not assume other "
        "utensils or appliances are available.\n"
        "- Prefer ingredients that are close to expiry but still usable.\n"
        "- Use simple, everyday cooking language suitable for beginners.\n\n"
        "Format the response exactly as follows:\n"
        "Recipe name\n"
        "Ingredients: list each ingredient with its quantity.\n"
        "Instructions: provide 3 to 6 short, numbered cooking steps.\n\n"
        "Keep the response concise. Include only the recipe name, "
        "ingredients and cooking instructions. No introduction, tables, "
        "explanations, tips, notes, substitutions or optional extras."
    )


    recipe_data=generate_recipe(prompt)
    recipe = Recipe.model_validate(recipe_data)

    for recipe_ingredient in recipe.ingredients:
        pantry_ingredient = next(
            (
                ingredient
                for ingredient in usable_ingredients
                if ingredient.name.lower() == recipe_ingredient.name.lower()
            ),
            None
        )

        if pantry_ingredient is None:
            raise HTTPException(
                status_code=400,
                detail=f"{recipe_ingredient.name} is not in your pantry."
            )

        try:
            required_quantity = convert_quantity(
                recipe_ingredient.quantity,
                recipe_ingredient.unit,
                pantry_ingredient.unit
            )
        except ValueError as error:
            raise HTTPException(status_code=400, detail=str(error))

        if required_quantity > pantry_ingredient.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Not enough {pantry_ingredient.name} in your pantry."
            )
        
        return{"recipe":recipe.model_dump()}

