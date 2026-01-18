import * as Chakra from "@chakra-ui/react";
import { EmployeeTable } from "@features";
import { useEmployeeStore } from "@stores";

const EmployeesPage = () => {
	const { employees } = useEmployeeStore();

	const handleDelete = () => {
		const ids = employees.filter((item) => item.checked).map((item) => item.id);
		console.log(ids);
	}

    return (
        <Chakra.Box p={6}>
            <Chakra.Heading mb={4}>Employees</Chakra.Heading>
			<Chakra.Button bg="red.500" color="white" _hover={{ bg: "#0A76E6" }} fontWeight="semibold" onClick={handleDelete}>
				Delete
			</Chakra.Button>
			<Chakra.Box w="50%"><EmployeeTable/></Chakra.Box>
        </Chakra.Box>
    );
}

export default EmployeesPage;
