import { Box } from "@mantine/core";
import { ComponentPropsWithoutRef, FC, useRef } from "react";
import { useClickOutside } from "src/shared/hooks";
import styles from "./ui.module.css";
import clsx from "clsx";
interface PopupModalProps extends ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
}

export const PopupModal: FC<PopupModalProps> = ({
  onClose,
  children,
  className,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);
  return (
    <Box ref={modalRef} className={clsx(className, styles["modal"])} {...props}>
      {children}
    </Box>
  );
};
