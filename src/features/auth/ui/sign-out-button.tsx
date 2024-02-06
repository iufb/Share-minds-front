import { Box } from "@mantine/core";
import { useUnit } from "effector-react";
import { $user } from "src/shared/session";
import styles from "./sign-out-button.module.css";
export const SignoutButton = () => {
  const user = useUnit($user);
  return (
    <Box className={styles["button"]} component="button">
      Log out @{user?.email.split("@")[0]}
    </Box>
  );
};
