from models import PersonDto
import csv
from typing import Any
from dataclasses import asdict

BASENAME_INDEX = 0

def get_dto_type(name: str) -> Any:
    Type = None
    match name:
        case 'person': Type = PersonDto
    return Type

# read csv file and insert data into database
def load_csv(name: str) -> list:
    tablename = name.split('.')[BASENAME_INDEX]
    Type = get_dto_type(tablename)
    with open(name,'r') as file:
        reader = csv.reader(file,delimiter=',')
        next(reader)
        data = []
        for row in reader:
            data.append(asdict(Type(*row)))
        return data
