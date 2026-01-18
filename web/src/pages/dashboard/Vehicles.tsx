import * as Chakra from "@chakra-ui/react";
import { VehicleTable } from "@features";
import { useVehicleStore } from "@stores";

const VehiclesPage = () => {
	const { vehicles } = useVehicleStore();

	const handleDelete = () => {
		const ids = vehicles.filter((item) => item.checked).map((item) => item.id);
		console.log(ids);
	}

    return (
        <Chakra.Box p={6}>
            <Chakra.Heading mb={4}>Vehicles</Chakra.Heading>
			<Chakra.Button bg="red.500" color="white" _hover={{ bg: "#0A76E6" }} fontWeight="semibold" onClick={handleDelete}>
				Delete
			</Chakra.Button>
			<Chakra.Box w="50%"><VehicleTable/></Chakra.Box>
        </Chakra.Box>
    );
}

export default VehiclesPage
