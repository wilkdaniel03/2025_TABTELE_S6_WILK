import { useState } from "react";
import { Stack, Input, Button, Select, NativeSelect, Field} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
export default function Register() {
    const [sc, setSc] = useState("");
    const [su, setSu] = useState("");
    const [sp, setSp] = useState("");
    const [sp2, setSp2] = useState("");
    const [se, setSe] = useState("");

    return (
        <AuthLayout title="Welcome to fleet system" subtitle="Create new account">
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

                <Field.Root>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        Confirm password
                    </Field.Label>
                    <Input h="44px" placeholder="Your password" type="password" value={sp2} onChange={(e) => setSp2(e.target.value)} />
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        Email
                    </Field.Label>
                    <Input h="44px" placeholder="Your email" value={se} onChange={(e) => setSe(e.target.value)} />
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        Country
                    </Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field h="44px" placeholder="Select country" value={sc} onChange={(e) => setSc(e.target.value)}>
                            <option value="Poland">Poland</option>
                            <option value="Germany">Germany</option>
                            <option value="USA">USA</option>
                        </NativeSelect.Field>
                    </NativeSelect.Root>
                </Field.Root>


                <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }} onClick={() => alert("Sign up TODO")}>
                    Sign up
                </Button>

                <Link to="/auth/login" style={{ textAlign: "center", fontSize: "13px", color: "#666" }}>
                    Already have an account
                </Link>
            </Stack>
        </AuthLayout>
    );
}
