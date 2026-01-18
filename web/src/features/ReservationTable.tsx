import { Table } from "@components";
import { useState, useEffect, useContext } from "react";
import { IReservationResponse} from "@http";
import { fetchChain, reservationsFields } from "@fetchChain";
import { TriggerCtx } from "@trigger";
import { useReservationStore, reservationToString } from "@stores";

const ReservationsTable = () => {
	const [trigger] = useContext(TriggerCtx)!;
	const chain = new fetchChain();
	const { addReservation, reservations } = useReservationStore();

	useEffect(() => {
		chain.fetchReservations()
			.then((data: IReservationResponse[]) => {
				for(let v of data)
					addReservation(v);
			})
			.catch(err => console.error(err));
	},[trigger.reservation]);

	return <Table fields={reservationsFields} data={reservations.map((item) => reservationToString(item))} checkable/>;
}

export default ReservationsTable;
