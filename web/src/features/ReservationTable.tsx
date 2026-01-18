import { Table } from "@components";
import { useState, useEffect, useContext } from "react";
import { IReservationResponse} from "@http";
import { fetchChain, reservationsFields } from "@fetchChain";
import { TriggerCtx } from "@trigger";
import { useReservationStore, reservationToString, reservationExtractChecked } from "@stores";

const ReservationsTable = () => {
	const [checkedAll,setCheckedAll] = useState<boolean>(false);
	const [trigger] = useContext(TriggerCtx)!;
	const chain = new fetchChain();
	const { addReservation, setChecked, reservations, clear } = useReservationStore();

	const handleCheckboxChange = (index:number) => {
		if(index == -1) {
			setCheckedAll(!checkedAll);
			for(let i = 0; i < reservations.length; i++) {
				if(checkedAll === reservations[i].checked) {
					setChecked(i);
				}
			}
		}
		else
			setChecked(index);
	}

	useEffect(() => {
		clear();
		chain.fetchReservations()
			.then((data: IReservationResponse[]) => {
				for(let v of data)
					addReservation(v);
			})
			.catch(err => console.error(err));
	},[trigger.reservation]);

	return <Table fields={reservationsFields} data={reservations.map((item) => reservationToString(item))} checkedall={checkedAll} checklist={reservationExtractChecked(reservations)} onCheckboxChange={handleCheckboxChange} checkable/>;
}

export default ReservationsTable;
