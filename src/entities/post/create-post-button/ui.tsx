import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconFeather } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import styles from "./ui.module.css";
interface CreatePostButtonProps {
  createPostForm: ReactNode;
}
export const CreatePostButton: FC<CreatePostButtonProps> = ({
  createPostForm,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const fullScreenModal = useMediaQuery("(max-width: 500px)");
  const tablet = useMediaQuery("(max-width: 990px)");

  return (
    <>
      <Button
        variant="filled"
        className={styles["button"]}
        color={"light-blue.6"}
        onClick={open}
      >
        {tablet ? <IconFeather /> : <Text>Post</Text>}
      </Button>
      <Modal
        size={616}
        fullScreen={fullScreenModal}
        opened={opened}
        onClose={close}
        px={0}
        title="Create Post"
      >
        {createPostForm}
      </Modal>
    </>
  );
};
