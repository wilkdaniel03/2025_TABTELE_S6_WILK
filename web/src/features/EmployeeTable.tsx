import { Table } from "@components";
import { useState, useEffect, useContext } from "react";
import { IVehicleResponse, IEmployeeResponse } from "@http";
import { fetchChain, employeesFields } from "@fetchChain";
import { TriggerCtx } from "@trigger";
import { useEmployeeStore, employeeToString, employeeExtractChecked } from "@stores";

const EmployeeTable = () => {
	const [checkedAll,setCheckedAll] = useState<boolean>(false);
	const [trigger] = useContext(TriggerCtx)!;
	const chain = new fetchChain();
	const { addEmployee, setChecked, employees, clear } = useEmployeeStore();

	const handleCheckboxChange = (index:number) => {
		if(index == -1) {
			setCheckedAll(!checkedAll);
			for(let i = 0; i < employees.length; i++) {
				if(checkedAll === employees[i].checked) {
					setChecked(i);
				}
			}
		}
		else
			setChecked(index);
	}

	useEffect(() => {
		clear();
		chain.fetchEmployees()
			.then((data: IEmployeeResponse[]) => {
				for(let val of data)
					addEmployee(val);
			})
			.catch(err => console.error(err));
	},[trigger.employee]);

	return <Table fields={employeesFields} data={employees.map((item) => employeeToString(item))} checkedall={checkedAll} checklist={employeeExtractChecked(employees)} onCheckboxChange={handleCheckboxChange} checkable/>;
}

export default EmployeeTable;
