import { Stack, Input, Button, Link, Field } from "@chakra-ui/react";

interface Props {
    onSignup: () => void;
    onReset: () => void;
}

const LoginForm = ({ onSignup, onReset }: Props) => {
    return (
        <Stack>
            <Field.Root>
                <Field.Label fontSize="14px" fontWeight="600">Username</Field.Label>
                <Input h="44px" placeholder="Your username" />
            </Field.Root>

            <Field.Root>
                <Field.Label fontSize="14px" fontWeight="600">Password</Field.Label>
                <Input h="44px" type="password" placeholder="Your password" />
            </Field.Root>

            <Link fontSize="13px" textAlign="center" onClick={onReset}>Reset password</Link>

            <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }}>
                Sign in
            </Button>

            <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }} onClick={onSignup}>
                Create new account
            </Button>
        </Stack>
    );
};

export default LoginForm;
