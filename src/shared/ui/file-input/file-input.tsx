import { HTMLAttributes, useRef } from "react";
import styles from "./file-input.module.css";
import { IconButton } from "src/shared/ui";
import { IconPhotoScan } from "@tabler/icons-react";
type FileInputType = {
  disabled?: boolean;
  accept?: string;
} & HTMLAttributes<HTMLInputElement>;
export const FileInput = ({
  disabled,
  accept = "image/webp,image/jpeg,image/jpg,image/png",
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
        icon={<IconPhotoScan />}
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
