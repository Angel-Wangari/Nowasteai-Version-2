from pydantic import BaseModel,Field
from datetime import date
class Ingredient(BaseModel):
    name:str
    quantity:float=Field(...,gt=0)
    unit:str
    expiry_date:date