import { Center, Loader } from "@mantine/core";

export const PageLoader = () => {
  return (
    <Center h="100vh" bg={"dark-blue.9"}>
      <Loader type="bars" color="white" />
    </Center>
  );
};
