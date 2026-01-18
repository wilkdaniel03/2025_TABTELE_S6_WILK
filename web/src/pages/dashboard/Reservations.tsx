import * as Chakra from "@chakra-ui/react";
import { ReservationTable } from "@features";
import { useReservationStore } from "@stores";

const ReservationsPage = () => {
	const { reservations } = useReservationStore();

	const handleDelete = () => {
		const ids = reservations.filter((item) => item.checked).map((item) => item.res_id);
	}
	
    return (
        <Chakra.Box p={6}>
            <Chakra.Heading mb={4}>Reservations</Chakra.Heading>
			<Chakra.Button bg="red.500" color="white" _hover={{ bg: "#0A76E6" }} fontWeight="semibold" onClick={handleDelete}>
				Delete
			</Chakra.Button>
			<Chakra.Box w="50%"><ReservationTable/></Chakra.Box>
        </Chakra.Box>
    );
}

export default ReservationsPage;
