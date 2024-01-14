import { Box, BoxComponentProps } from "@mantine/core";
import styles from "./image-preview.module.css";
import { IconButton } from "src/shared/ui";
import { IconX } from "@tabler/icons-react";
type ImagePreviewType = { src: string; close: () => void } & BoxComponentProps;
export const ImagePreview = ({
  src,
  close,
  maw,
  mah,
  ...props
}: ImagePreviewType) => {
  return (
    <Box className={styles["wrapper"]} mah={mah} maw={maw} {...props}>
      <Box component="img" className={styles["preview"]} src={src} w="100%" />
      <IconButton icon={<IconX />} variant="close" onClick={close} />
    </Box>
  );
};
