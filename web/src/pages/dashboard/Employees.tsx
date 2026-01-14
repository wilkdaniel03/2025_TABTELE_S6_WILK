import { Box, Heading, Text } from "@chakra-ui/react";
import { EmployeeTable } from "@features";

const EmployeesPage = () => {
    return (
        <Box p={6}>
            <Heading mb={4}>Employees</Heading>
            <Text>This is the Employees page placeholder.</Text>
			<Box w="50%"><EmployeeTable/></Box>
        </Box>
    );
}

export default EmployeesPage;
