import { Stack } from "@chakra-ui/react";
import { AuthLayout } from "@components/auth";
import { Form, IFormField } from "@components";

const FORM_FIELDS: IFormField[] = [
	{ name: "email", label: "Email", placeholder: "Your email", type: "text"},
	// TODO Button
];

export default function ForgotPassword() {
    return (
        <AuthLayout title="Welcome to fleet system" subtitle="Reset password">
            <Stack>
				<Form fields={FORM_FIELDS} submitLabel="Reset password" onSubmit={(data) => alert("Reset password")} />
            </Stack>
        </AuthLayout>
    );
}
