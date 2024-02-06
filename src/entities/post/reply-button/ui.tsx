import { IconButton } from "src/shared/ui";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMessageCircle } from "@tabler/icons-react";
import { Modal } from "@mantine/core";
import { FC, ReactNode } from "react";
import { PostType } from "src/shared/api/post";
interface ReplyButtonProps {
  replyPostForm: ReactNode;
  source?: PostType;
}
export const ReplyButton: FC<ReplyButtonProps> = ({
  replyPostForm,
  source,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const fullScreenModal = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <IconButton icon={<IconMessageCircle size={18} />} onClick={open} />
      <Modal
        size={616}
        fullScreen={fullScreenModal}
        opened={opened}
        onClose={close}
        px={0}
        title="Create Post"
      >
        {replyPostForm}
      </Modal>
    </>
  );
};
