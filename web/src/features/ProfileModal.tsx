import { Form, IFormField } from "@components";
import * as Chakra from "@chakra-ui/react";

const FORM_FIELDS: IFormField[] = [
	{ name: "name", label: "Name", type: "text" },
	{ name: "surname", label: "Surname", type: "text" },
	{ name: "dateOfBirth", label: "Date of Birth", type: "text" },
	{ name: "phoneNumber", label: "Phone number", type: "text" },
	{ name: "pesel", label: "Pesel", type: "text" },
	{ name: "nationality", label: "Nationality", type: "text" }
];

const ProfileModal = () => {
	return (
		<Chakra.Box width="70%" marginLeft="auto" marginRight="auto">
			<Form fields={FORM_FIELDS} onSubmit={(data) => console.log(data)}>
				{(handleSubmit) => <Chakra.Button onClick={handleSubmit} width="100%" fontWeight="semibold" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }}>
						Change
					</Chakra.Button>}
			</Form>
		</Chakra.Box>
	);
}

export default ProfileModal;
