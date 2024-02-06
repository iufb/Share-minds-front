import { Group, Text } from "@mantine/core";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { IconButton } from "src/shared/ui";
import styles from "./ui.module.css";
interface ReactPanelButtonProps {
  action: () => void;
  icon: ReactNode;
  active: boolean;
  activeColor: "red" | "green" | "blue";
  quantity: number;
}
export const ReactPanelButton: FC<ReactPanelButtonProps> = ({
  action,
  active,
  activeColor,
  quantity,
  icon,
}) => {
  return (
    <div
      className={clsx(
        styles["wrapper"],
        {
          blue: styles["blue"],
          green: styles["green"],
          red: styles["red"],
        }[activeColor],
        !active && styles["unactive"],
      )}
    >
      <IconButton
        onClick={action}
        icon={icon}
        active={active}
        activeColor={activeColor}
      />
      <span>{quantity}</span>
    </div>
  );
};
