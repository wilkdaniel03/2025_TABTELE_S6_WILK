import { Table } from "@components";

const FIELDS: string[] = ["brand","model","vin","registration_number","production_year","current_mileage","status"];

const DATA: string[][] = [
	["a","b","c","d","e","f","g"],
	["a","b","c","d","e","f","g"],
	["a","b","c","d","e","f","g"],
	["a","b","c","d","e","f","g"],
	["a","b","c","d","e","f","g"],
	["a","b","c","d","e","f","g"]
]

const VehicleTable = () => {
	return <Table fields={FIELDS} data={DATA}/>;
}

export default VehicleTable;
