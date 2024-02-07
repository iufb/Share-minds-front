import { Box } from "@mantine/core";
import { useUnit } from "effector-react";
import { $user } from "src/shared/session";
import styles from "./sign-out-button.module.css";
import { signOutButtonClicked } from "../models/sign-out";
export const SignoutButton = () => {
  const user = useUnit($user);
  return (
    <Box
      className={styles["button"]}
      component="button"
      onClick={() => signOutButtonClicked()}
    >
      Log out @{user?.email.split("@")[0]}
    </Box>
  );
};
