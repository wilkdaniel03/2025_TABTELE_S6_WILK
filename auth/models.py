from sqlalchemy import Column, String, Integer, DateTime, Engine, MetaData
from sqlalchemy.orm import registry


metadata = MetaData()
Base = registry(metadata=metadata).generate_base()


class Person(Base):
    __tablename__ = "person"

    id = Column(Integer,primary_key=True,unique=True,nullable=False)
    name = Column(String(50),nullable=False)
    surname = Column(String(50),nullable=False)
    date_of_birth = Column(DateTime,nullable=False)
    phone_number = Column(Integer,unique=True,nullable=False)
    pesel = Column(Integer,unique=True,nullable=False)
    nationality = Column(String(50),default="Polish",nullable=True)


def init_db(engine: Engine) -> None:
    metadata.drop_all(engine)
    metadata.create_all(engine)
