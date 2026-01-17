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


class VehicleType(Base):
    __tablename__ = "vehicle_type"

    vehtype_id = Column(Integer,primary_key=True,autoincrement=True,nullable=False) 
    brand = Column(String(50),nullable=False)
    model = Column(String(50),nullable=False)
    version = Column(String(50),nullable=False)
    segment = Column(String(50),nullable=False)


@dataclass
class VehicleTypeDto:
    brand: str
    model: str
    version: str
    segment: str


@dataclass
class VehicleTypeRec:
    id: int
    brand: str
    model: str
    version: str
    segment: str


class Vehicle(Base):
    __tablename__ = "vehicle"

    veh_id = Column(Integer,primary_key=True,autoincrement=True,nullable=False) 
    vin = Column(String(50),unique=True,nullable=False)
    registration_number = Column(String(50),unique=True,nullable=False)
    current_mileage = Column(Integer,nullable=False)
    production_year = Column(Integer,nullable=False)
    status = Column(String(50),nullable=False)
    vehtype_id = Column(Integer,nullable=False)


@dataclass
class VehicleDto:
    vin: str
    registration_number: str
    current_mileage: int
    production_year: int
    status: str
    vehtype_id: int


@dataclass
class VehicleRec:
    id: int 
    vin: str
    registration_number: str
    current_mileage: int
    production_year: int
    status: str
    type: VehicleTypeRec


@dataclass
class EmployeeRec:
    id: int
    name: str
    surname: str


class Reservation(Base):
    __tablename__ = "reservation"

    res_id = Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    trip_type = Column(String(50),nullable=False)
    status = Column(String(50),nullable=False)
    start_mileage = Column(Integer,nullable=False)
    end_mileage = Column(Integer,nullable=False)
    comments = Column(String(50),nullable=False)
    reservation_date = Column(String(50),nullable=False)
    planned_departure = Column(String(50),nullable=False)
    planned_arrival = Column(String(50),nullable=False)
    employee_id = Column(Integer,nullable=False)
    vehicle_id = Column(Integer,ForeignKey(Vehicle.veh_id),nullable=False)


@dataclass
class ReservationDto:
    trip_type: str
    status: str
    start_mileage: int
    end_mileage: int
    comments: str
    reservation_date: str
    planned_departure: str
    planned_arrival: str
    employee_id: int
    vehicle_id: int


@dataclass
class ReservationRec:
    res_id: int
    trip_type: str
    status: str
    start_mileage: int
    end_mileage: int
    comments: str
    reservation_date: str
    planned_departure: str
    planned_arrival: str
    employee_name: str
    vehicle_name: str
