import { Button } from "@mantine/core";
import styles from "./ui.module.css";
export const FollowButton = () => {
  return (
    <Button
      variant="white"
      color={"white"}
      c={"black"}
      className={styles.wrapper}
    >
      Follow
    </Button>
  );
};
