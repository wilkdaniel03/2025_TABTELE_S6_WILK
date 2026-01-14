import { useEffect, useMemo, useContext } from 'react';
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
