import { Table } from "@components";
import { useState, useEffect } from "react";
import { IVehicleResponse, IEmployeeResponse } from "@http";

const FIELDS: string[] = ["name","surname"];

const fetchEmployees = async () => {
	const res = await fetch(`http://bd.wilkdaniel.com:8082/employee`,{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-Type": "application/json"
		}
	});

	return await res.json();
}

const EmployeeTable = () => {
	const [employees,setEmployees] = useState<string[][]>([]);

	useEffect(() => {
		fetchEmployees()
			.then((data: IEmployeeResponse[]) => {
				let newEmployees = [];
				for(let val of data) {
					let current = [];
					current.push(`${val.name}`);
					current.push(`${val.surname}`);
					newEmployees.push(current);
				}
				setEmployees(newEmployees);
			})
			.catch(err => console.error(err));
	},[]);

	return <Table fields={FIELDS} data={employees}/>;
}

export default EmployeeTable;
