import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/LoginScreen";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPass";
import {
	Reservations,
	Vehicles,
	Settings,
	Notifications,
    DashboardPage
} from './pages/dashboard';

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Router>
                <Routes>

                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/register" element={<Register />} />
                    <Route path="auth/forgot" element={<ForgotPassword />} />

					<Route path="dashboard" element={<DashboardPage/> }>
						<Route path="reservations" element={<Reservations />} />
						<Route path="vehicles" element={<Vehicles />} />
						<Route path="settings" element={<Settings />} />
						<Route path="notifications" element={<Notifications />} />
						<Route path="" element={<Navigate to="/dashboard/reservations" />} />
						<Route path="*" element={<Navigate to="/dashboard/reservations" />} />
					</Route>

                    <Route path="auth/*" element={<Navigate to="/auth/login" replace={true}/>} />
                    <Route path="*" element={<Navigate to="/auth/login" replace={true}/>} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
