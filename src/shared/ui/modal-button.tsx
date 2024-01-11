import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, ReactNode } from "react";
interface IModalButton {
  children: ReactNode;
  buttonContent: ReactNode;
}
export const ModalButton: FC<IModalButton> = ({ children, buttonContent }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={true} c={"dark"}>
        {children}
      </Modal>

      <Button onClick={open}>{buttonContent}</Button>
    </>
  );
};
