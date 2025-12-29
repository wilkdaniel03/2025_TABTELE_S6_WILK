from sqlalchemy import Column, String, Integer, DateTime, Engine, MetaData, Boolean, ForeignKey
from sqlalchemy.orm import registry


metadata = MetaData()
Base = registry(metadata=metadata).generate_base()


class Person(Base):
    __tablename__ = "person"

    person_id = Column(Integer,primary_key=True,unique=True,nullable=False)
    name = Column(String(50),nullable=False)
    surname = Column(String(50),nullable=False)
    date_of_birth = Column(DateTime,nullable=False)
    phone_number = Column(Integer,unique=True,nullable=False)
    pesel = Column(Integer,unique=True,nullable=False)
    nationality = Column(String(50),default="Polish",nullable=True)


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer,primary_key=True,unique=True,nullable=False)
    username = Column(String(50),nullable=False)
    password = Column(String(50),nullable=False)
    last_login = Column(DateTime,nullable=False)
    activity = Column(Boolean,nullable=False)
    is_admin = Column(Boolean,default=False,nullable=False)
    person_id = Column(Integer,ForeignKey("person.person_id",onupdate="CASCADE",ondelete="RESTRICT"),unique=True,nullable=False)


def init_db(engine: Engine) -> None:
    metadata.drop_all(engine)
    metadata.create_all(engine)
