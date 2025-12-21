import { Stack, Input, Button, Link, Field } from "@chakra-ui/react";

interface Props {
    onBack: () => void;
}

const ResetForm = ({ onBack }: Props) => {
    return (
        <Stack>
            <Field.Root>
                <Field.Label fontSize="14px" fontWeight="600">Email</Field.Label>
                <Input h="44px" placeholder="Your email" />
            </Field.Root>

            <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }}>
                Reset password
            </Button>

            <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }} onClick={onBack}>
                Create new account
            </Button>

            <Link textAlign="center" fontSize="13px" color="gray.600" onClick={onBack}>
                Back to sign in
            </Link>
        </Stack>
    );
};

export default ResetForm;
