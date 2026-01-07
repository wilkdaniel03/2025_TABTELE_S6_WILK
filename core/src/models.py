from sqlalchemy import MetaData, Column, Integer, String
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


@dataclass
class VehicleTypeDto:
    brand: str
    model: str
    version: str
    segment: str
