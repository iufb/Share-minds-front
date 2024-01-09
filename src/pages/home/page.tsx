import { Button, Container } from "@mantine/core";
import { Link } from "atomic-router-react";
import { routes } from "src/shared/routing";
export const HomePage = () => {
  return (
    <Container fluid h="100vh" bg={"dark-blue.9"} c={"white"}>
      Home
      <Button component={Link} to={routes.auth.signin}>
        SignIn
      </Button>
    </Container>
  );
};
