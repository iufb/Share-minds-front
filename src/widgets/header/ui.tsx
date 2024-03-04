import { Box } from "@mantine/core";
import styles from "./ui.module.css";
import { Link } from "atomic-router-react";
import { routes } from "src/shared/routing";
export const Header = () => {
  return (
    <header className={styles["wrapper"]}>
      <Link to={routes.home} className={styles["logoWrapper"]}>
        <img className={styles["logo"]} src="/logo-no-background.svg" />
      </Link>
      <Box>Search</Box>
    </header>
  );
};
