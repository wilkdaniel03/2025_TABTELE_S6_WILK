export enum HttpStatus {
	OK = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404
}

export interface IVehicleTypeResponse {
	id: number;
	brand: string;
	model: string;
	version: string;
	segment: string;
}

export interface IVehicleResponse {
	id: number;
	vin: string;
	registration_number: string;
	current_mileage: number;
	production_year: number;
	status: string;
	type: IVehicleTypeResponse;
}

export interface IEmployeeResponse {
	id: number;
	name: string;
	surname: string;
}

export interface IUserResponse {
	id: number;
	name: string;
	surname: string;
	date_of_birth: string;
	phone_number: string;
	pesel: string;
	nationality: string;
	[key: string]: string | number;
}

export interface IUserRequest {
	name?: string;
	surname?: string;
	date_of_birth?: string;
	phone_number?: string;
	pesel?: string;
	nationality?: string;
}

export interface IReservationResponse {
	res_id: number;
	trip_type: string;
	status: string;
	start_mileage: number;
	end_mileage: number;
	comments: string;
	reservation_date: string;
	planned_departure: string;
	planned_arrival: string;
	employee_name: string
	vehicle_name: string
}
