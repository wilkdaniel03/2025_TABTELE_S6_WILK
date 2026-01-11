import { Table } from "@components";
import { useState, useEffect } from "react";
import { IVehicleResponse } from "@http";

const FIELDS: string[] = ["brand","model","vin","registration_number","production_year","current_mileage","status"];

const fetchVehicles = async () => {
	const res = await fetch(`http://bd.wilkdaniel.com:8082/vehicle`,{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-Type": "application/json"
		}
	});

	return await res.json();
}

const VehicleTable = () => {
	const [vehicles,setVehicles] = useState<string[][]>([]);

	useEffect(() => {
		fetchVehicles()
			.then((data: IVehicleResponse[]) => {
				let newVehicles = [];
				for(let val of data) {
					let current = [];
					current.push(`${val.type.brand}`);
					current.push(`${val.type.model}`);
					current.push(`${val.vin}`);
					current.push(`${val.registration_number}`);
					current.push(`${val.production_year}`);
					current.push(`${val.current_mileage}`);
					current.push(`${val.status}`);
					newVehicles.push(current);
				}
				setVehicles(newVehicles);
			})
			.catch(err => console.error(err));
	},[]);

	return <Table fields={FIELDS} data={vehicles}/>;
}

export default VehicleTable;
