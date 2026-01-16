import { Stack } from "@chakra-ui/react";
import { AuthLayout } from "@components/auth";
import { Form, IFormField } from "@components";
import * as Chakra from "@chakra-ui/react"

const FORM_FIELDS: IFormField[] = [
	{ name: "username", label: "Username", placeholder: "Your username", type: "text" },
	{ name: "password", label: "Password", placeholder: "Your password", type: "password" },
	{ name: "confirmPassword", label: "Confirm password", placeholder: "Your password", type: "password" },
	{ name: "email", label: "Email", placeholder: "Your email", type: "text" },
	{ name: "country", label: "Country", placeholder:"Select country", type: "select", options: [
		{ value: "poland", label: "Poland" },
		{ value: "germany", label: "Germany" },
		{ value: "usa", label: "United States of America" }
	] }
];

const Register = () => {
    return (
        <AuthLayout title="Welcome to fleet system" subtitle="Create new account">
            <Stack>
				<Form fields={FORM_FIELDS} onSubmit={(data) => alert("SIGNED UP")} >
					{(handleSubmit) => <Chakra.Button onClick={handleSubmit} width="100%" fontWeight="semibold" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }}>
							Create new account
						</Chakra.Button>}
				</Form>
            </Stack>
        </AuthLayout>
    );
}

export default Register;
