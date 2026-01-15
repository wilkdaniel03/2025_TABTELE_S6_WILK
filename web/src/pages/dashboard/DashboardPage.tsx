import { useEffect, useMemo, useContext } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import * as Chakra from '@chakra-ui/react';
import { DashboardTabs, ProfileMenu } from "@features";
import { useToastStore, ToastIconType } from "@stores";
import { Avatar } from "@components";

const DashboardPage = () => {
	const navigate = useNavigate();
	const { clear, append } = useToastStore();

	useMemo(() => {
		// clear();
		// append({type:ToastIconType.LOADING,message:"Connecting with API gateway",fixed:true})
	},[]);

	useEffect(() => {
		if(!localStorage.getItem("token")) {
			// TODO Should check token validity!!!
			navigate("/");
		}
	},[]);

	return (
		<>
			<h1>Dashboard</h1>
			<DashboardTabs/>
			<ProfileMenu/>
			<Outlet/>
		</>
	);
}

export default DashboardPage;
