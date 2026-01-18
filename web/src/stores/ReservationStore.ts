import { create } from "zustand";
import { IReservationResponse } from "@http";

interface IReservation extends IReservationResponse {
	checked: boolean;
}

export const reservationToString = (input: IReservation): string[] => {
	let current = [];
	current.push(`${input.trip_type}`);
	current.push(`${input.status}`);
	current.push(`${input.start_mileage}`);
	current.push(`${input.end_mileage}`);
	current.push(`${input.comments}`);
	current.push(`${input.reservation_date}`);
	current.push(`${input.planned_departure}`);
	current.push(`${input.planned_arrival}`);
	current.push(`${input.employee_name}`);
	current.push(`${input.vehicle_name}`);
	return current;
}

export const reservationExtractChecked = (input: IReservation[]): boolean[] => {
	let current: boolean[] = input.map((item) => item.checked);
	return current;
}

interface IReservationStore {
	reservations: IReservation[];
	addReservation: (el: IReservationResponse) => void;
	setChecked: (id: number) => void;
	clear: () => void;
}

export const useReservationStore = create<IReservationStore>((set) => ({
	reservations: [],
	addReservation: (el) => set((state) => {
		state.reservations.push({...el,checked:false});
		return { reservations: state.reservations };
	}),
	setChecked: (id) => set((state) => {
		state.reservations[id].checked = !state.reservations[id].checked;
		return { reservations: state.reservations };
	}),
	clear: () => set((state) => {
		state.reservations.length = 0;
		return { reservations: state.reservations };
	})
}));
