import { Button } from "@mantine/core";
import { FC } from "react";
import styles from "./ui.module.css";
import clsx from "clsx";
import { IconFeather } from "@tabler/icons-react";
interface ICreatePostButton {
  variant: "sidebar" | "base";
}
export const CreatePostButton: FC<ICreatePostButton> = ({ variant }) => {
  return (
    <Button
      variant="filled"
      radius={100}
      className={clsx(
        styles["button"],
        variant === "sidebar" ? styles["sidebarVariant"] : styles["base"],
      )}
    >
      <IconFeather className={styles["icon"]} />
      <span className={styles["text"]}>Post</span>
    </Button>
  );
};
