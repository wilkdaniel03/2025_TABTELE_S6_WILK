import { Box, Heading, Text } from "@chakra-ui/react";
import { ReservationTable } from "@features";

const ReservationsPage = () => {
    return (
        <Box p={6}>
            <Heading mb={4}>Reservations</Heading>
			<Box w="50%"><ReservationTable/></Box>
        </Box>
    );
}

export default ReservationsPage;
