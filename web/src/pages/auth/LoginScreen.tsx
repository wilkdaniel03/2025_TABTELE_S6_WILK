import { Stack, Input, Button, Text, Field } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useState, useEffect } from "react";

const URL = "http://bd.wilkdaniel.com:8081/token";

interface IUser {
	username: string;
	password: string;
}

const getToken = async (data: IUser) => {
	const res = await fetch(URL,{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	return await res.json();
}

export default function Login() {
    const [su, setSu] = useState("");
    const [sp, setSp] = useState("");
	const [click, setClick] = useState(false);

	useEffect(() => {
		if(!click) return;
		getToken({username: su, password: sp})
			.then(res => console.log(res));
		setClick(false)
	},[click]);

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
                    onClick={() => setClick(true)}
                >
                    Sign in
                </Button>

                <Text fontSize="13px" color="gray.600" textAlign="center">
                    <Link to="/auth/forgot">Reset password</Link>
                </Text>

                <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }}>
                    <Link to="/auth/register" style={{ width: "100%", display: "block", textAlign: "center", color: "white" }}>
                        Create new account
                    </Link>
                </Button>
            </Stack>
        </AuthLayout>
    );
}
