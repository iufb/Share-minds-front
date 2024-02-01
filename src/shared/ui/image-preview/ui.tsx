import { Box, BoxComponentProps, Group } from "@mantine/core";
import styles from "./ui.module.css";
import { IconButton } from "src/shared/ui";
import { IconX } from "@tabler/icons-react";
import { ReadedFilesType } from "src/shared/utils";
import { FC } from "react";
interface ImagePreviewProps extends BoxComponentProps {
  src: string;
  close: () => void;
}
interface ImagesPreviewProps {
  close: (file: ReadedFilesType) => void;
  readedFiles: ReadedFilesType[] | null;
}
export const ImagesPreview: FC<ImagesPreviewProps> = ({
  readedFiles,
  close,
}) => {
  return (
    <Group className={styles["previewContainer"]}>
      {readedFiles &&
        readedFiles.map((file) => {
          return (
            <ImagePreview
              key={file.src}
              close={() => close(file)}
              src={file.src}
              mah={readedFiles.length > 1 ? "300px" : "100%"}
              maw={readedFiles.length > 1 ? "46%" : "100%"}
            />
          );
        })}
    </Group>
  );
};
const ImagePreview = ({
  src,
  close,
  maw,
  mah,
  ...props
}: ImagePreviewProps) => {
  return (
    <Box className={styles["wrapper"]} mah={mah} maw={maw} {...props}>
      <Box component="img" className={styles["preview"]} src={src} w="100%" />
      <IconButton icon={<IconX />} variant="close" onClick={close} />
    </Box>
  );
};
