import { Box, Container, Group } from "@mantine/core";
import { FC, ReactNode } from "react";
import styles from "./layout.module.css";
interface IBaseLayout {
  header: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
}
export const BaseLayout: FC<IBaseLayout> = ({ header, main, sidebar }) => {
  return (
    <Container fluid h={"100vh"} maw={1270} p={{ xl: 10, md: 0 }}>
      <Box component="header" h={50} className={styles["header"]}>
        {header}
      </Box>
      <Group
        h={"100%"}
        w={"100%"}
        align="start"
        gap={0}
        className={styles["group"]}
      >
        <Box className={styles["sidebar"]}>{sidebar}</Box>
        <Box component="main" className={styles["main"]}>
          {main}
        </Box>
        <Box className={styles["aside"]}>Aside</Box>
      </Group>
    </Container>
  );
};
