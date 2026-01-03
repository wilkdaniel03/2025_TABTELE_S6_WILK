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
            px={{ base: 4, md: 6 }}
            py={{ base: 0, md: 10 }}
        >
            <Box
                w="100%"
                maxW={{ base: "100%", md: "430px" }}
                bg="white"
                borderRadius={{ base: "0", md: "2xl" }}
                boxShadow={{ base: "none", md: "2xl" }}
                overflow="hidden"
            >
                <Container py={10}>
                    <Stack gap={6}>
                        <Stack textAlign="center">
                            <Heading fontWeight="600" fontSize="22px">
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