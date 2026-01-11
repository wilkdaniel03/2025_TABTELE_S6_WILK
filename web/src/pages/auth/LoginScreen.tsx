import { Stack, Input, Button, Text, Field } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthLayout from "@components/auth/AuthLayout";
import { LoadingButton, LoadingButtonState } from "@components";
import { HttpStatus } from "@http";
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
	const [buttonState, setButtonState] = useState<LoadingButtonState>(LoadingButtonState.INACTIVE);
	const navigate = useNavigate();
	let should_redirect: boolean = false;

	useMemo(() => {
		if(localStorage.getItem("token"))
			should_redirect = true;
	},[]);

	useEffect(() => {
		if(!click) return;
		setButtonState(LoadingButtonState.LOADING);
		getToken({username: su, password: sp})
			.then((res: IResponse) => {
				localStorage.setItem("token",res.token);
				navigate("/dashboard/");
				setButtonState(LoadingButtonState.INACTIVE);
			}).catch(err => {
				setError(err.message);
				setButtonState(LoadingButtonState.INACTIVE);
			});
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

					<LoadingButton click={() => setClick(true)} state={buttonState} color="#5B5BF7">Sign in</LoadingButton>

					<Text fontSize="13px" color="gray.600" textAlign="center">
						<Link to="/auth/forgot">Reset password</Link>
					</Text>

					<Button bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }} fontWeight="semibold">
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
