import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/LoginScreen";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPass";

import Settings from "./pages/dashboard/Settings";
import Reservations from "./pages/dashboard/Reservations";
import Vehicles from "./pages/dashboard/Vehicles";
import Notifications from "./pages/dashboard/Notifications";

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Router>
                <Routes>

                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/forgot" element={<ForgotPassword />} />

                    <Route path="/dashboard/settings" element={<Settings />} />
                    <Route path="/dashboard/reservations" element={<Reservations />} />
                    <Route path="/dashboard/vehicles" element={<Vehicles />} />
                    <Route path="/dashboard/notifications" element={<Notifications />} />

                    <Route path="/dashboard/*" element={<Navigate to="/dashboard/reservations" replace={true}/>} />
                    <Route path="/auth/*" element={<Navigate to="/auth/login" replace={true}/>} />
                    <Route path="/*" element={<Navigate to="/auth/login" replace={true}/>} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
