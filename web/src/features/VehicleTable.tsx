import { Table } from "@components";
import { useState, useEffect } from "react";
import { IVehicleResponse } from "@http";
import { fetchChain, vehiclesFields } from "@fetchChain";

const VehicleTable = () => {
	const [vehicles,setVehicles] = useState<string[][]>([]);
	const chain = new fetchChain();

	useEffect(() => {
		chain.fetchVehicles()
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

	return <Table fields={vehiclesFields} data={vehicles}/>;
}

export default VehicleTable;
