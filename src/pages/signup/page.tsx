import { Container, Stack, Title } from "@mantine/core";
import { SignUpForm } from "src/features/auth";

export const SignupPage = () => {
  return (
    <Container fluid h="100vh" bg={"dark-blue.9"} c={"white"} p={0}>
      <Stack justify="center" align="center" h={"100vh"}>
        <Title>Join us!</Title>
        <SignUpForm />
      </Stack>
    </Container>
  );
};
