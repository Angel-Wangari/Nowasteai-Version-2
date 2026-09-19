from datetime import date
from sqlalchemy.orm import Mapped,mapped_column
from app.database import Base
class Ingredient(Base):
    __tablename__="ingredients"
    id:Mapped[int]=mapped_column(primary_key=True,autoincrement=True)
    name:Mapped[str]
    unit:Mapped[str]
    quantity:Mapped[float]
    expiry_date:Mapped[date]