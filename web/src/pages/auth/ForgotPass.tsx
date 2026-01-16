import { Stack } from "@chakra-ui/react";
import { AuthLayout } from "@components/auth";
import { Form, IFormField } from "@components";
import * as Chakra from "@chakra-ui/react";
import { Link } from "react-router-dom";

const FORM_FIELDS: IFormField[] = [
	{ name: "email", label: "Email", placeholder: "Your email", type: "text"},
	// TODO Button
];

export default function ForgotPassword() {
    return (
        <AuthLayout title="Welcome to fleet system" subtitle="Reset password">
            <Stack>
				<Form fields={FORM_FIELDS} submitLabel="Reset password" onSubmit={(data) => alert("Reset password")} />
				<Chakra.Button bg="#0B84FF" fontWeight="semibold" color="white" _hover={{ bg: "#0A76E6" }}>
					<Link to="/auth/register" style={{ width: "100%", display: "block", textAlign: "center", color: "white" }}>
						Create new account
					</Link>
				</Chakra.Button>
            </Stack>
        </AuthLayout>
    );
}
