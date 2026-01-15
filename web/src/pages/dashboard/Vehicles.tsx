import { Box, Heading, Text } from "@chakra-ui/react";
import { VehicleTable } from "@features";

const VehiclesPage = () => {
    return (
        <Box p={6}>
            <Heading mb={4}>Vehicles</Heading>
			<Box w="50%"><VehicleTable/></Box>
        </Box>
    );
}

export default VehiclesPage
