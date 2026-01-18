import { Table } from "@components";
import { useState, useEffect, useContext } from "react";
import { IReservationResponse} from "@http";
import { fetchChain, reservationsFields } from "@fetchChain";
import { TriggerCtx } from "@trigger";

const ReservationsTable = () => {
	const [reservations,setReservations] = useState<string[][]>([]);
	const [trigger] = useContext(TriggerCtx)!;
	const chain = new fetchChain();

	useEffect(() => {
		chain.fetchReservations()
			.then((data: IReservationResponse[]) => {
				let newVehicles = [];
				for(let val of data) {
					let current = [];
					current.push(`${val.trip_type}`);
					current.push(`${val.status}`);
					current.push(`${val.start_mileage}`);
					current.push(`${val.end_mileage}`);
					current.push(`${val.comments}`);
					current.push(`${val.reservation_date}`);
					current.push(`${val.planned_departure}`);
					current.push(`${val.planned_arrival}`);
					current.push(`${val.employee_name}`);
					current.push(`${val.vehicle_name}`);
					newVehicles.push(current);
				}
				setReservations(newVehicles);
			})
			.catch(err => console.error(err));
	},[trigger.reservation]);

	return <Table fields={reservationsFields} data={reservations} checkable/>;
}

export default ReservationsTable;
