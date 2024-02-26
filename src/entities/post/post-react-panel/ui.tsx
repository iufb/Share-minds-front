import { Group } from "@mantine/core";
import { FC, ReactNode } from "react";
import styles from "./ui.module.css";
interface PostReactPanelProps {
  controlButtons: Record<string, ReactNode>;
  showBorder: boolean;
}
export const PostReactPanel: FC<PostReactPanelProps> = ({
  controlButtons,
  showBorder,
}) => {
  return (
    <Group
      className={showBorder ? styles["border"] : ""}
      gap={10}
      justify="space-evenly"
      py={10}
      align="center"
    >
      {Object.values(controlButtons).map((controlButton) => controlButton)}
    </Group>
  );
};
