import { Box } from "@mantine/core";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import styles from "./ui.module.css";
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon?: ReactNode;
}
export const Button: FC<ButtonProps> = ({ children, icon, ...props }) => {
  return (
    <Box className={styles["button"]} component="button" {...props}>
      {icon}
      {children}
    </Box>
  );
};
