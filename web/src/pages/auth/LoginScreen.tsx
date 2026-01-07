import { Stack, Input, Button, Text, Field } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, Navigate } from 'react-router-dom';

const URL = "http://bd.wilkdaniel.com:8081/token";

interface IUser {
	username: string;
	password: string;
}

interface IResponse {
	token: string;
}

enum HttpStatus {
	OK = 200,
	NOT_FOUND = 404
}

const getToken = async (data: IUser) => {
	const res = await fetch(URL,{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})

	if(res.status === HttpStatus.NOT_FOUND)
		throw Error("Incorrect username or password")
	if(!res.ok)
		throw Error("Failed to fetch");
	return await res.json();
}

const Login = () => {
    const [su, setSu] = useState<string>("");
    const [sp, setSp] = useState<string>("");
	const [click, setClick] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();
	let should_redirect: boolean = false;

	useMemo(() => {
		if(localStorage.getItem("token"))
			should_redirect = true;
	},[]);

	useEffect(() => {
		if(!click) return;
		getToken({username: su, password: sp})
			.then((res: IResponse) => {
				localStorage.setItem("token",res.token);
				navigate("/dashboard/");
			}).catch(err => setError(err.message));
		setClick(false);
	},[click]);

    return (
		<>
			{!should_redirect
			?
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

					<span style={{color: "red"}}>{ error }</span>

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
			: <Navigate to="/dashboard/" replace={true}/>}
		</>
    );
}

export default Login;
