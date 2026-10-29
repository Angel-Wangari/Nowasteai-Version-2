from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
DATABASE_URL="postgresql+psycopg2://:@localhost:5432/nowasteai"
Base=declarative_base()
ENGINE=create_engine(DATABASE_URL)
SessionLocal=sessionmaker(ENGINE)
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()