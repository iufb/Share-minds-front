import { Button, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { FC, ReactNode } from "react";
interface EditProfileButtonProps {
  editForm: ReactNode;
}
export const EditProfileButton: FC<EditProfileButtonProps> = ({ editForm }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(max-width: 720px)");
  return (
    <>
      <Button variant="outline" radius={"lg"} color={"white"} onClick={open}>
        Edit Profile
      </Button>
      <Modal
        size={616}
        fullScreen={matches}
        opened={opened}
        onClose={close}
        px={0}
        title="Edit Profile"
        centered
      >
        {editForm}
      </Modal>
    </>
  );
};
