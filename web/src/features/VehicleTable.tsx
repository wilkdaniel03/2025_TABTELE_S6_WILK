import { Table } from "@components";
import { useState, useEffect, useContext } from "react";
import { IVehicleResponse, UserRole } from "@http";
import { fetchChain, vehiclesFields } from "@fetchChain";
import { TriggerCtx } from "@trigger";
import { useVehicleStore, vehicleToString, vehicleExtractChecked, useUserInfoStore } from "@stores";

const VehicleTable = () => {
	const [checkedAll,setCheckedAll] = useState<boolean>(false);
	const [trigger] = useContext(TriggerCtx)!;
	const chain = new fetchChain();
	const { addVehicle, setChecked, vehicles, clear } = useVehicleStore();
	const { role } = useUserInfoStore();

	const handleCheckboxChange = (index:number) => {
		if(index == -1) {
			setCheckedAll(!checkedAll);
			for(let i = 0; i < vehicles.length; i++) {
				if(checkedAll === vehicles[i].checked) {
					setChecked(i);
				}
			}
		}
		else
			setChecked(index);
	}

	useEffect(() => {
		clear();
		chain.fetchVehicles()
			.then((data: IVehicleResponse[]) => {
				for(let val of data)
					addVehicle(val);
			})
			.catch(err => console.error(err));
	},[trigger.vehicle]);

	return <Table fields={vehiclesFields} data={vehicles.map((item) => vehicleToString(item))} checkedall={checkedAll} checklist={vehicleExtractChecked(vehicles)} onCheckboxChange={handleCheckboxChange} checkable={role === UserRole.ADMIN}/>;
}

export default VehicleTable;
