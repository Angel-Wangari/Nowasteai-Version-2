from pydantic import BaseModel,Field
from datetime import date
class Ingredient(BaseModel):
    name:str
    quantity:float=Field(...,gt=0)
    unit:str
    expiry_date:date
class KitchenEquipmentCreate(BaseModel):
    has_cooker:bool=False
    has_frying_pan:bool=False
    has_oven:bool=False
    has_microwave:bool=False
    has_blender:bool=False
    has_air_fryer:bool=False