import * as Chakra from "@chakra-ui/react";
import { ReservationTable } from "@features";
import { useReservationStore, useUserInfoStore } from "@stores";
import { UserRole } from "@http";
import { fetchChain } from "@fetchChain";

const ReservationsPage = () => {
	const { reservations } = useReservationStore();
	const fetch = new fetchChain();
	const { role } = useUserInfoStore();

	const handleDelete = () => {
		if(role !== UserRole.ADMIN) return;
		const ids = reservations.filter((item) => item.checked).map((item) => item.res_id);
		for(let v of ids) {
			fetch.deleteReservation(v).then();
		}
	}
	
    return (
        <Chakra.Box p={6}>
            <Chakra.Heading mb={4}>Reservations</Chakra.Heading>
			{role === UserRole.ADMIN ? <Chakra.Button bg="red.500" color="white" _hover={{ bg: "#0A76E6" }} fontWeight="semibold" onClick={handleDelete}>
				Delete
			</Chakra.Button> : <></>}
			<Chakra.Box w="50%"><ReservationTable/></Chakra.Box>
        </Chakra.Box>
    );
}

export default ReservationsPage;
