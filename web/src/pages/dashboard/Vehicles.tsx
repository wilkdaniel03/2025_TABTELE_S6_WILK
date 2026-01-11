import { Box, Heading, Text } from "@chakra-ui/react";
import { VehicleTable } from "@features";

const VehiclesPage = () => {
    return (
        <Box p={6}>
            <Heading mb={4}>Vehicles</Heading>
            <Text>This is the Vehicles page placeholder.</Text>
			<Box w="40%"><VehicleTable/></Box>
        </Box>
    );
}

export default VehiclesPage
