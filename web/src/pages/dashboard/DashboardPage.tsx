import { useEffect, useMemo, useContext } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import * as Chakra from '@chakra-ui/react';
import { DashboardTabs } from "@features";
import { useToastStore, ToastIconType } from "@stores";
import { WebsocketCtx } from "@websocket";

const DashboardPage = () => {
	const navigate = useNavigate();
	const { clear, append } = useToastStore();
	const [ws,setWs] = useContext(WebsocketCtx)!;

	useMemo(() => {
		clear();
		append({type:ToastIconType.LOADING,message:"Connecting with API gateway",fixed:true})
	},[]);

	useEffect(() => {
		if(!localStorage.getItem("token")) {
			// TODO Should check token validity!!!
			navigate("/");
		}
		setWs({ready:ws.ready,msg_tx:"SIEMA",msg_rx:ws.msg_rx});
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
