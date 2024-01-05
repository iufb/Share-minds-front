import { Container, Stack, Title } from "@mantine/core"
import { SignInForm } from "src/features/auth"

export const SignInPage = () => {
  return <Container fluid h='100vh' bg={'dark-blue.9'} c={'white'}  >
    <Stack justify="center" align="center" h={'100vh'} >
      <Title>Welcome Back!</Title>
      <SignInForm />
    </Stack>
  </Container>
}
