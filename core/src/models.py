import sqlalchemy
from sqlalchemy import MetaData, Column, Integer, String, UniqueConstraint, DateTime, ForeignKey
from sqlalchemy.orm import registry
from dataclasses import dataclass


metadata = MetaData()
Base = registry(metadata=metadata).generate_base()


class VehicleType(Base):
    __tablename__ = "vehicletype"

    vehtype_id = Column(Integer,primary_key=True,autoincrement=True,nullable=False) 
    brand = Column(String(50),nullable=False)
    model = Column(String(50),nullable=False)
    version = Column(String(50),nullable=False)
    segment = Column(String(50),nullable=False)

    __table_args__ = (UniqueConstraint("brand","model",name="brand_model_unique_constraint"),)


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
    reservation_date = Column(DateTime,nullable=False)
    planned_departure = Column(DateTime,nullable=False)
    planned_arrival = Column(DateTime,nullable=False)
    employee_id = Column(Integer,nullable=False)
    vehicle_id = Column(Integer,ForeignKey(Vehicle.veh_id),nullable=False)


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


def init_db(engine: sqlalchemy.Engine) -> None:
    metadata.drop_all(engine)
    metadata.create_all(engine)
