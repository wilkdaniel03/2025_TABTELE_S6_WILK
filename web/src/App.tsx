import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";

import Login from "@pages/auth/LoginScreen";
import Register from "@pages/auth/Register";
import ForgotPassword from "@pages/auth/ForgotPass";
import {
	ReservationsPage,
	VehiclesPage,
	SettingsPage,
	NotificationsPage,
	EmployeesPage,
    DashboardPage
} from '@pages/dashboard';
import { ToastBox } from "@features";
import { WebsocketProvider } from "@websocket";
import { TriggerProvider } from "@trigger";

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
			<WebsocketProvider>
				<TriggerProvider>
					<ToastBox/>
					<Router>
						<Routes>

							<Route path="auth/login" element={<Login />} />
							<Route path="auth/register" element={<Register />} />
							<Route path="auth/forgot" element={<ForgotPassword />} />

							<Route path="dashboard" element={<DashboardPage/> }>
								<Route path="">
									<Route path="" element={<Navigate to="/dashboard/reservations" replace={true} />} />
									<Route path="reservations" element={<ReservationsPage />} />
									<Route path="employees" element={<EmployeesPage />} />
									<Route path="vehicles" element={<VehiclesPage />} />
									<Route path="settings" element={<SettingsPage />} />
								</Route>
								<Route path="notifications" element={<NotificationsPage />} />
								<Route path="*" element={<Navigate to="/dashboard/reservations" replace={true} />} />
							</Route>

							<Route path="auth/*" element={<Navigate to="/auth/login" replace={true}/>} />
							<Route path="*" element={<Navigate to="/auth/login" replace={true}/>} />
						</Routes>
					</Router>
				</TriggerProvider>
			</WebsocketProvider>
        </ChakraProvider>
    );
}

export default App;
