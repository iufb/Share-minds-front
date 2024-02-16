import { Modal as MantineModal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, ReactNode } from "react";

interface ModalProps {
  opened: boolean;
  close: () => void;
  children: ReactNode;
  title: string;
}
export const Modal: FC<ModalProps> = ({ opened, close, children, title }) => {
  const fullScreenModal = useMediaQuery("(max-width: 500px)");

  return (
    <MantineModal
      size={616}
      fullScreen={fullScreenModal}
      opened={opened}
      onClose={close}
      px={0}
      title={title}
    >
      {children}
    </MantineModal>
  );
};
