import { create } from "zustand";
import { IEmployeeResponse } from "@http";

interface IEmployee extends IEmployeeResponse {
	checked: boolean;
}

export const employeeToString = (input: IEmployee): string[] => {
	let current = [];
	current.push(`${input.name}`);
	current.push(`${input.surname}`);
	return current;
}

export const employeeExtractChecked = (input: IEmployee[]): boolean[] => {
	let current: boolean[] = input.map((item) => item.checked);
	return current;
}

interface IEmployeeStore {
	employees: IEmployee[];
	addEmployee: (el: IEmployeeResponse) => void;
	setChecked: (id: number) => void;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
	employees: [],
	addEmployee: (el) => set((state) => {
		state.employees.push({...el,checked:false});
		return { employees: state.employees};
	}),
	setChecked: (id) => set((state) => {
		state.employees[id].checked = !state.employees[id].checked;
		return { employees: state.employees};
	})
}));
