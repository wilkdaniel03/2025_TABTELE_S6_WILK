import { useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';

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
			<Outlet/>
		</>
	);
}

export default DashboardPage;
