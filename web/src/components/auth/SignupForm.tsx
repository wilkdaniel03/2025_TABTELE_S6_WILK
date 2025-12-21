import { Stack, Input, Button, Link, Field, NativeSelect } from "@chakra-ui/react";

interface Props {
    onBack: () => void;
}

const SignupForm = ({ onBack }: Props) => {
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

            <Field.Root>
                <Field.Label fontSize="14px" fontWeight="600">Confirm password</Field.Label>
                <Input h="44px" type="password" placeholder="Your password" />
            </Field.Root>

            <Field.Root>
                <Field.Label fontSize="14px" fontWeight="600">Email</Field.Label>
                <Input h="44px" placeholder="Your email" />
            </Field.Root>

            <Field.Root>
                <Field.Label fontSize="14px" fontWeight="600">Country</Field.Label>
                <NativeSelect.Root>
                    <NativeSelect.Field h="44px" placeholder="Select country">
                        <option value="Poland">Poland</option>
                        <option value="Germany">Germany</option>
                        <option value="USA">USA</option>
                    </NativeSelect.Field>
                </NativeSelect.Root>
            </Field.Root>

            <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }}>
                Sign up
            </Button>

            <Link textAlign="center" fontSize="13px" color="gray.600" onClick={onBack}>
                Already have an account
            </Link>
        </Stack>
    );
};

export default SignupForm;
