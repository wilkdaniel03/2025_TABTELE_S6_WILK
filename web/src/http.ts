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
