import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import * as Chakra from '@chakra-ui/react';
import { DashboardTabs } from "@features";
import { useToastStore, ToastIconType } from "@stores";

const DashboardPage = () => {
	const navigate = useNavigate();
	const { clear, append } = useToastStore();

	useMemo(() => {
		clear();
		append({type:ToastIconType.LOADING,message:"Connecting with API gateway",fixed:true})
	},[]);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:5555/");

		ws.onopen = () => {
			clear();
			append({type:ToastIconType.SUCCESS,message:"Connected with API gateway",fixed:true});
		};

		ws.onmessage = (event) => {
			console.log(event.data);
		};

		ws.onerror = () => {
			clear();
			append({type:ToastIconType.ERROR,message:"Failed to connect with API gateway",fixed:true});
		}

		if(!localStorage.getItem("token")) {
			// TODO Should check token validity!!!
			navigate("/");
		}
	},[]);

	return (
		<>
			<h1>Dashbord</h1>
			<DashboardTabs/>
			<Outlet/>
		</>
	);
}

export default DashboardPage;
