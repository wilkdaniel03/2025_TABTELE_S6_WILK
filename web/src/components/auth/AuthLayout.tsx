import { Box, Container, Stack, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
    title: string;
    subtitle: string;
    children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: Props) => {
    return (
        <Box
            minH="100vh"
            bg={{ base: "white", md: "gray.900" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={{ base: 4, md: 0 }}
        >
            <Box
                w="100%"
                maxW="430px"
                bg="white"
                borderRadius={{ base: "none", md: "2xl" }}
                boxShadow={{ base: "none", md: "2xl" }}
            >
                <Container py={10}>
                    <Stack>
                        <Stack textAlign="center">
                            <Heading fontSize={{ base: "20px", md: "22px" }}>
                                {title}
                            </Heading>
                            <Text fontSize="14px" color="gray.600">
                                {subtitle}
                            </Text>
                        </Stack>
                        {children}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default AuthLayout;
