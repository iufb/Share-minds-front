import { Group } from "@mantine/core";
import { FC, ReactNode } from "react";

interface PostReactPanelProps {
  controlButtons: ReactNode[];
}
export const PostReactPanel: FC<PostReactPanelProps> = ({ controlButtons }) => {
  return (
    <Group gap={10} justify="space-between" align="center">
      {controlButtons.map((controlButton) => controlButton)}
    </Group>
  );
};
