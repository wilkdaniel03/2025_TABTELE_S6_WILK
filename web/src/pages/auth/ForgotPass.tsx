import { Stack, Input, Button, Field} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useState } from "react";

export default function ForgotPassword() {
    const [re, setRe] = useState("");

    return (
        <AuthLayout title="Welcome to fleet system" subtitle="Reset password">
            <Stack>
                <Field.Root>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        Email
                    </Field.Label>
                    <Input h="44px" placeholder="Your email" value={re} onChange={(e) => setRe(e.target.value)} />
                </Field.Root>

                <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }} onClick={() => alert("Reset password TODO")}>
                    Reset password
                </Button>

                <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }}>
                    <Link to="/auth/register" style={{ width: "100%", display: "block", textAlign: "center", color: "white" }}>
                        Create new account
                    </Link>
                </Button>
            </Stack>
        </AuthLayout>
    );
}
