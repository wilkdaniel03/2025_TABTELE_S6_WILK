import { create } from "zustand";
import { IVehicleResponse } from "@http";

interface IVehicle extends IVehicleResponse {
	checked: boolean;
}

export const vehicleToString = (input: IVehicle): string[] => {
	let current = [];
	current.push(`${input.type.brand}`);
	current.push(`${input.type.model}`);
	current.push(`${input.vin}`);
	current.push(`${input.registration_number}`);
	current.push(`${input.production_year}`);
	current.push(`${input.current_mileage}`);
	current.push(`${input.status}`);
	return current;
}

export const vehicleExtractChecked = (input: IVehicle[]): boolean[] => {
	let current: boolean[] = input.map((item) => item.checked);
	return current;
}

interface IVehicleStore {
	vehicles: IVehicle[];
	addVehicle: (el: IVehicleResponse) => void;
	setChecked: (id: number) => void;
	clear: () => void;
}

export const useVehicleStore = create<IVehicleStore>((set) => ({
	vehicles: [],
	addVehicle: (el) => set((state) => {
		state.vehicles.push({...el,checked:false});
		return { vehicles: state.vehicles};
	}),
	setChecked: (id) => set((state) => {
		state.vehicles[id].checked = !state.vehicles[id].checked;
		return { vehicles: state.vehicles};
	}),
	clear: () => set((state) => {
		state.vehicles.length = 0;
		return { vehicles: state.vehicles };
	})
}));
