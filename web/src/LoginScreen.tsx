import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    Link,
    Stack,
    Text,
	Field,
	NativeSelect
} from "@chakra-ui/react";

type Screen = "login" | "signup" | "reset";

const LoginScreen = () => {
    const [screen, setScreen] = useState<Screen>("login");

    // Login
    const [u, setU] = useState("");
    const [p, setP] = useState("");

    // Signup
    const [su, setSu] = useState("");
    const [sp, setSp] = useState("");
    const [sp2, setSp2] = useState("");
    const [se, setSe] = useState("");
    const [sc, setSc] = useState("");

    // Reset
    const [re, setRe] = useState("");

    const title = screen === "login" ? "Let's sign in" : screen === "signup" ? "Create new account" : "Reset password";

    return (
        <Box minH="100vh" bg={{ base: "white", md: "gray.900" }} py={{ base: 0, md: 10 }} px={{ base: 0, md: 6 }}>
            <Box
                w="100%"
                maxW={{ base: "100%", md: "430px" }}
                mx="auto"
                bg="white"
                borderRadius={{ base: "0", md: "2xl" }}
                boxShadow={{ base: "none", md: "2xl" }}
                overflow="hidden"
            >
                <Container maxW="100%" px={{ base: 5, md: 6 }} py={{ base: 10, md: 10 }}>
                    <Stack>
                        <Stack textAlign="center">
                            <Heading fontWeight="600" fontSize="22px">
                                Welcome to fleet system
                            </Heading>
                            <Text fontSize="14px" color="gray.600">
                                {title}
                            </Text>
                        </Stack>

                        {/* LOGIN */}
                        {screen === "login" && (
                            <Stack>
                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Username
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your username" value={u} onChange={(e) => setU(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Password
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your password" type="password" value={p} onChange={(e) => setP(e.target.value)} />
                                </Field.Root>

                                <Link textAlign="center" fontSize="13px" color="gray.600" onClick={() => setScreen("reset")}>
                                    Reset password
                                </Link>

                                <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }} onClick={() => alert("Sign in (TODO)")}>
                                    Sign in
                                </Button>

                                <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }} onClick={() => setScreen("signup")}>
                                    Create new account
                                </Button>
                            </Stack>
                        )}

                        {/* SIGNUP */}
                        {screen === "signup" && (
                            <Stack>
                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Username
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your username" value={su} onChange={(e) => setSu(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Password
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your password" type="password" value={sp} onChange={(e) => setSp(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Confirm password
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your password" type="password" value={sp2} onChange={(e) => setSp2(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Email
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your email" value={se} onChange={(e) => setSe(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Country
                                    </Field.Label>
                                    <NativeSelect.Root>
										<NativeSelect.Field h="44px" placeholder="Select country" value={sc} onChange={(e) => setSc(e.target.value)}>
											<option value="Poland">Poland</option>
											<option value="Germany">Germany</option>
											<option value="USA">USA</option>
										</NativeSelect.Field>
                                    </NativeSelect.Root>
                                </Field.Root>

                                <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }} onClick={() => alert("Sign up (TODO)")}>
                                    Sign up
                                </Button>

                                <Link textAlign="center" fontSize="13px" color="gray.600" onClick={() => setScreen("login")}>
                                    Already have an account
                                </Link>
                            </Stack>
                        )}

                        {/* RESET */}
                        {screen === "reset" && (
                            <Stack>
                                <Field.Root>
                                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                                        Email
                                    </Field.Label>
                                    <Input h="44px" placeholder="Your email" value={re} onChange={(e) => setRe(e.target.value)} />
                                </Field.Root>

                                <Button h="48px" bg="#5B5BF7" color="white" _hover={{ bg: "#4B4BEA" }} onClick={() => alert("Reset password (TODO)")}>
                                    Reset password
                                </Button>

                                <Button h="48px" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }} onClick={() => setScreen("signup")}>
                                    Create new account
                                </Button>

                                <Link textAlign="center" fontSize="13px" color="gray.600" onClick={() => setScreen("login")}>
                                    Back to sign in
                                </Link>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Box>
	)
}

export default LoginScreen;
