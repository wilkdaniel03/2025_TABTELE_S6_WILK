import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import * as Chakra from '@chakra-ui/react';
import { DashboardTabs } from "@features";
import { useToastStore } from "@stores";

const DashboardPage = () => {
	const navigate = useNavigate();
	const { clear } = useToastStore();

	useMemo(() => {
		clear();
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
