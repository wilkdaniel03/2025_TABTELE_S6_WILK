import { useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import * as Chakra from '@chakra-ui/react';
import { DashboardTabs } from "@features";

const DashboardPage = () => {
	const navigate = useNavigate();

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
