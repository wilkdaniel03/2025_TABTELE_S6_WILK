import { Stack, Input, Button, Text, Field } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useState } from "react";

export default function Login() {
    const [su, setSu] = useState("");
    const [sp, setSp] = useState("");

    return (
        <AuthLayout title="Welcome to fleet system" subtitle="Let's sign in">
            <Stack>
                <Field.Root>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        Username
                    </Field.Label>
                    <Input h="44px" placeholder="Your username" value={su} onChange={(e) => setSu(e.target.value)} />
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        Password
                    </Field.Label>
                    <Input h="44px" placeholder="Your password" type="password" value={sp} onChange={(e) => setSp(e.target.value)} />
                </Field.Root>

                <Button
                    h="48px"
                    bg="#5B5BF7"
                    color="white"
                    _hover={{ bg: "#4B4BEA" }}
                    onClick={() => alert("Sign in TODO")}
                >
                    Sign in
                </Button>

                <Text fontSize="13px" color="gray.600" textAlign="center">
                    <Link to="/auth/forgot">Reset password</Link>
                </Text>

                <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }}>
                    <Link to="/auth/Register" style={{ width: "100%", display: "block", textAlign: "center", color: "white" }}>
                        Create new account
                    </Link>
                </Button>
            </Stack>
        </AuthLayout>
    );
}
