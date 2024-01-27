import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./icon-button.module.css";
import clsx from "clsx";
type IconButtonType = {
  icon: ReactNode;
  variant?: "close" | "base" | "like" | "transparent";
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const IconButton = ({
  icon,
  className,
  variant = "base",
  ...props
}: IconButtonType) => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        styles["button"],
        {
          base: styles["base"],
          close: styles["close"],
          like: styles["like"],
          transparent: styles["transparent"],
        }[variant],
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
