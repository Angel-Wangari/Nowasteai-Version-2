from sqlalchemy.orm import Mapped,mapped_column
from app.database import Base 
class KitchenEquipment(Base):
    __tablename__="kitchen_equipment"
    id:Mapped[int]=mapped_column(primary_key=True,autoincrement=True)
    has_cooker:Mapped[bool]=mapped_column(default=False)
    has_frying_pan:Mapped[bool]=mapped_column(default=False)
    has_oven:Mapped[bool]=mapped_column(default=False)
    has_microwave:Mapped[bool]=mapped_column(default=False)
    has_blender:Mapped[bool]=mapped_column(default=False)
    has_air_fryer:Mapped[bool]=mapped_column(default=False)
    
    
