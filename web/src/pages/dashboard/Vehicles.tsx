import * as Chakra from "@chakra-ui/react";
import { VehicleTable } from "@features";
import { useVehicleStore, useUserInfoStore } from "@stores";
import { UserRole } from "@http";
import { fetchChain } from "@fetchChain";

const VehiclesPage = () => {
	const { vehicles } = useVehicleStore();
	const fetch = new fetchChain();
	const { role } = useUserInfoStore();

	const handleDelete = () => {
		if(role !== UserRole.ADMIN) return;
		const ids = vehicles.filter((item) => item.checked).map((item) => item.id);
		for(let v of ids) {
			fetch.deleteVehicle(v).then();
		}
	}

    return (
        <Chakra.Box p={6}>
            <Chakra.Heading mb={4}>Vehicles</Chakra.Heading>
			{role === UserRole.ADMIN ? <Chakra.Button bg="red.500" color="white" _hover={{ bg: "#0A76E6" }} fontWeight="semibold" onClick={handleDelete}>
				Delete
			</Chakra.Button> : <></>}
			<Chakra.Box w="50%"><VehicleTable/></Chakra.Box>
        </Chakra.Box>
    );
}

export default VehiclesPage
