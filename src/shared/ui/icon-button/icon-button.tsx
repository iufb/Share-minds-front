import { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./icon-button.module.css";
import clsx from "clsx";
interface IconButtonType extends ComponentPropsWithoutRef<"button"> {
  icon: ReactNode;
  variant?: "close" | "base";
  active?: boolean;
  activeColor?: "blue" | "green" | "red";
}
export const IconButton = ({
  icon,
  className,
  variant = "base",
  active,
  activeColor,
  ...props
}: IconButtonType) => {
  return (
    <button
      type="button"
      className={clsx(
        className,
        styles["button"],
        variant == "close" && styles["close"],
        activeColor
          ? {
              blue: styles["blue"],
              green: styles["green"],
              red: styles["red"],
            }[activeColor]
          : styles["blue"],
        !active && styles["unactive"],
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
