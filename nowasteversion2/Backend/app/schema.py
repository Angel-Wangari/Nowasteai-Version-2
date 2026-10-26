from pydantic import BaseModel,Field,field_validator
from datetime import date
VALID_UNITS={"g","kg","L","ml","pieces"}
class Ingredient(BaseModel):
    name:str
    quantity:float=Field(...,gt=0)
    unit:str
    expiry_date:date
    @field_validator("unit")
    @classmethod
    def validate_unit(cls,value):
        if value not in VALID_UNITS:
            raise ValueError(f"Unit must be one of : {',' .join(sorted(VALID_UNITS))}")
        return value
class KitchenEquipmentCreate(BaseModel):
    has_cooker:bool=False
    has_frying_pan:bool=False
    has_oven:bool=False
    has_microwave:bool=False
    has_blender:bool=False
    has_air_fryer:bool=False
class RecipeIngredient(BaseModel):
    name:str
    quantity:float=Field(...,gt=0)
    unit:str
class Recipe(BaseModel):
    name:str
    ingredients:list[RecipeIngredient]
    instructions:list[str]
class RecipeConfirmation(BaseModel):
    made:bool
    recipe:Recipe
    
    
       