import { useEffect, useMemo, useContext } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import * as Chakra from '@chakra-ui/react';
import { DashboardTabs, ProfileMenu } from "@features";
import { useToastStore, ToastIconType, useUserInfoStore } from "@stores";
import { Avatar } from "@components";
import { fetchChain } from "@fetchChain";

const DashboardPage = () => {
	const navigate = useNavigate();
	const { clear, append } = useToastStore();
	const { role, setRole } = useUserInfoStore();
	const fetch = new fetchChain();

	useMemo(() => {
		// clear();
		// append({type:ToastIconType.LOADING,message:"Connecting with API gateway",fixed:true})
	},[]);

	useEffect(() => {
		if(!localStorage.getItem("token")) {
			// TODO Should check token validity!!!
			navigate("/");
		}

		fetch.fetchRole()
			.then((role) => setRole(role))
			.catch(() => append({type: ToastIconType.ERROR,message:"Failed to fetch role",fixed:false}));
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
