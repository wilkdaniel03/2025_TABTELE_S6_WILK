import { IUserRequest } from "@http";

export const vehiclesFields: string [] = ["brand","model","vin","registration_number","production_year","current_mileage","status"];
export const employeesFields: string[] = ["name","surname"];
export const reservationsFields: string[] = ["trip_type","status","start_mileage","end_mileage","comments","reservation_date","planned_departure","planned_arrival","employee_name","vehicle_name"];

export class fetchChain {
	private url = "http://bd.wilkdaniel.com:8082";

	public async fetchVehicles() : Promise<any> {
		const res = await fetch(`${this.url}/vehicle`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			}
		});
		return await res.json();
	}

	public async fetchEmployees() : Promise<any> {
		const res = await fetch(`${this.url}/employee`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			}
		});

		return await res.json();
	}

	public async fetchReservations() : Promise<any> {
		const res = await fetch(`${this.url}/reservation`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			}
		});

		return await res.json();
	}

	public async fetchUserInfo() : Promise<any> {
		const res = await fetch(`${this.url}/user`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			}
		});

		return await res.json();
	}

	public async updateUserInfo(data: IUserRequest) : Promise<any> {
		const res = await fetch(`${this.url}/user`,{
			method: "POST",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		return { status: res.status, data: await res.json() };
	}
}
