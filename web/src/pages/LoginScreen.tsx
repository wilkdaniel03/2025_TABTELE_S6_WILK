import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import ResetForm from "../components/auth/ResetForm";
import { Screen } from "../components/auth/types";

const LoginScreen = () => {
    const [screen, setScreen] = useState<Screen>("login");

    const subtitle =
        screen === "login"
            ? "Let's sign in"
            : screen === "signup"
                ? "Create new account"
                : "Reset password";

    return (
        <AuthLayout title="Welcome to fleet system" subtitle={subtitle}>
            {screen === "login" && <LoginForm onSignup={() => setScreen("signup")} onReset={() => setScreen("reset")} />}
            {screen === "signup" && <SignupForm onBack={() => setScreen("login")} />}
            {screen === "reset" && <ResetForm onBack={() => setScreen("login")} />}
        </AuthLayout>
    );
};

export default LoginScreen;
