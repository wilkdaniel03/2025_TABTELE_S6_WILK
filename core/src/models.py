import sqlalchemy
from sqlalchemy import MetaData, Column, Integer, String, UniqueConstraint
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
    vin = Column(String(50),nullable=False)
    registration_number = Column(String(50),nullable=False)
    current_mileage = Column(Integer,nullable=False)
    production_year = Column(Integer,nullable=False)
    status = Column(String(50),nullable=False)


@dataclass
class VehicleDto:
    vin: str
    registration_number: str
    current_mileage: int
    production_year: int
    status: str
    type: VehicleTypeDto


@dataclass
class VehicleRec:
    id: int 
    vin: str
    registration_number: str
    current_mileage: int
    production_year: int
    status: str
    type: VehicleTypeDto


def init_db(engine: sqlalchemy.Engine) -> None:
    metadata.drop_all(engine)
    metadata.create_all(engine)
