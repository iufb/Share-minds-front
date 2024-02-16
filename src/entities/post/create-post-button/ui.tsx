import { Button, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconFeather } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import styles from "./ui.module.css";
import { Modal } from "src/shared/ui";
interface CreatePostButtonProps {
  createPostForm: ReactNode;
}
export const CreatePostButton: FC<CreatePostButtonProps> = ({
  createPostForm,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
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
      <Modal opened={opened} close={close} title="Create Post">
        {createPostForm}
      </Modal>
    </>
  );
};
