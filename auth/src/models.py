from sqlalchemy import Column, String, Integer, Date, DateTime, Engine, MetaData, Boolean, ForeignKey
from sqlalchemy.orm import registry
from dataclasses import dataclass
from datetime import date, datetime


metadata = MetaData()
Base = registry(metadata=metadata).generate_base()


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer,primary_key=True,autoincrement=True,nullable=False)
    username = Column(String(50),nullable=False)
    password = Column(String(50),nullable=False)
    last_login = Column(DateTime,nullable=False)
    is_active = Column(Boolean,nullable=False)


def str_to_bool(input: str) -> bool:
    if input.lower() or input == '1':
        return True
    else:
        return False


@dataclass
class UserDto:
    username: str
    password: str
    last_login: datetime
    is_active: bool

    @classmethod
    def from_str(cls,username:str,password:str,last_login:datetime,is_active:str,is_admin:str):
        # is_admin field not used in the db schema anymore
        return cls(username,password,last_login,str_to_bool(is_active))


class Person(Base):
    __tablename__ = "person"

    person_id = Column(Integer,primary_key=True,autoincrement=True,nullable=False)
    name = Column(String(50),nullable=False)
    surname = Column(String(50),nullable=False)
    date_of_birth = Column(Date,nullable=False)
    phone_number = Column(String(9),unique=True,nullable=False)
    pesel = Column(String(11),unique=True,nullable=False)
    nationality = Column(String(50),default="Polish",nullable=False)
    user_id = Column(Integer,ForeignKey(User.user_id,onupdate="CASCADE",ondelete="CASCADE"),unique=True,nullable=False)


@dataclass
class PersonDto:
    name: str
    surname: str
    date_of_birth: date
    phone_number: str
    pesel: str
    nationality: str
    user_id: int


class Role(Base):
    __tablename__ = "role"

    role_id = Column(Integer,primary_key=True,autoincrement=True,nullable=False)
    name = Column(String(50),nullable=False)
    user_id = Column(Integer,ForeignKey(User.user_id,onupdate="CASCADE",ondelete="CASCADE"),unique=True,nullable=False)


@dataclass
class RoleDto:
    name: str
    user_id: int


def init_db(engine: Engine) -> None:
    metadata.drop_all(engine)
    metadata.create_all(engine)
