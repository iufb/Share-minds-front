import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./icon-button.module.css";
import clsx from "clsx";
type IconButtonType = {
  icon: ReactNode;
  variant?: "close" | "base";
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const IconButton = ({
  icon,
  variant = "base",
  ...props
}: IconButtonType) => {
  return (
    <button
      type="button"
      className={clsx(
        styles["button"],
        {
          base: styles["base"],
          close: styles["close"],
        }[variant],
      )}
      {...props}
    >
      {icon}
    </button>
  );
};