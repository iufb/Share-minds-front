import { Box, Button, Slider, Stack, Text } from "@mantine/core";
import { EventCallable } from "effector";
import { FC, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
interface ImageCropProps {
  srcImage: string | null;
  cropWidth: number;
  cropHeight: number;
  imageCropped: EventCallable<{ dataUrl: string; blob: Blob }>;
}
export const ImageCrop: FC<ImageCropProps> = ({
  srcImage,
  cropHeight,
  cropWidth,
  imageCropped,
}) => {
  const [scale, setScale] = useState(1);
  const editor = useRef<AvatarEditor>(null);
  return (
    <Stack align="center">
      <AvatarEditor
        ref={editor}
        image={srcImage ?? ""}
        width={cropWidth}
        height={cropHeight}
        crossOrigin={"use-credentials"}
        scale={scale}
        border={5}
        color={[0, 0, 255, 1]} // RGBA
      />
      <Text size="sm">Zoom:</Text>
      <Slider
        w={300}
        onChange={setScale}
        color="light-blue.5"
        value={scale}
        min={1}
        max={2}
        step={0.1}
      />
      <Button
        variant="white"
        w={" 100% "}
        onClick={() => {
          if (editor.current) {
            const canvasScaled = editor.current.getImageScaledToCanvas();
            const url = canvasScaled.toDataURL();
            canvasScaled.toBlob((blob) => {
              if (blob) imageCropped({ dataUrl: url, blob });
            });
          }
        }}
      >
        Save
      </Button>
    </Stack>
  );
};
