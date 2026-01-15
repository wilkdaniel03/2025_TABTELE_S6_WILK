export const vehiclesFields: string [] = ["brand","model","vin","registration_number","production_year","current_mileage","status"];
export const employeesFields: string[] = ["name","surname"];

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
}
