import { Table } from "@components";
import { useState, useEffect } from "react";
import { IVehicleResponse, IEmployeeResponse } from "@http";
import { fetchChain, employeesFields } from "@fetchChain";


const EmployeeTable = () => {
	const [employees,setEmployees] = useState<string[][]>([]);
	const chain = new fetchChain();

	useEffect(() => {
		chain.fetchEmployees()
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

	return <Table fields={employeesFields} data={employees}/>;
}

export default EmployeeTable;
