import { Outlet, Navigate } from 'react-router-dom';

const DashboardPage = () => {
	return (
		<>
			<h1>Dashbord</h1>
			<Outlet/>
		</>
	);
}

export default DashboardPage
