import { HTMLAttributes, useRef } from "react";
import styles from "./file-input.module.css";
import { IconButton } from "src/shared/ui";
import { IconPhotoScan } from "@tabler/icons-react";
const sizeVariants = {
  md: 20,
  lg: 40,
};
type FileInputType = {
  size?: "md" | "lg";
  variant?: "base" | "transparent";
  disabled?: boolean;
  accept?: string;
} & HTMLAttributes<HTMLInputElement>;
export const FileInput = ({
  size = "md",
  variant = "base",
  disabled,
  accept = "image/webp,image/jpeg,image/jpg,image/png",
  className,
  ...props
}: FileInputType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  return (
    <>
      <IconButton
        onClick={selectFile}
        disabled={disabled}
        variant={variant}
        icon={<IconPhotoScan size={sizeVariants[size]} />}
        className={className}
      />
      <input
        type="file"
        accept={accept}
        {...props}
        className={styles["fileInput"]}
        hidden
        ref={inputRef}
      />
    </>
  );
};
