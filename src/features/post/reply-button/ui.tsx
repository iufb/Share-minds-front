import { Avatar, Box, Grid, Modal, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMessageCircle } from "@tabler/icons-react";
import { FC } from "react";
import { ReactPanelButton } from "src/entities/post";
import { CreateReplyForm } from "src/features/post";
import { PostType } from "src/shared/api/post";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
interface ReplyButtonProps {
  repliesCount: number;
  source: PostType;
}
export const ReplyButton: FC<ReplyButtonProps> = ({ repliesCount, source }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const fullScreenModal = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <ReactPanelButton
        icon={<IconMessageCircle size={18} />}
        quantity={repliesCount}
        action={open}
        active={false}
        activeColor="blue"
      />
      <Modal
        size={616}
        fullScreen={fullScreenModal}
        opened={opened}
        onClose={close}
        px={0}
        title="Reply"
      >
        <Grid px={10}>
          <Grid.Col span={2}>
            <Box h="100%" maw={40}>
              <Avatar
                src={getImgUrl(source.author.avatar)}
                radius="sm"
                size={40}
              />
              <hr className={styles["stroke"]} />
            </Box>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text component="span" size="lg">
              {source.author.username}
            </Text>{" "}
            <Text component="span" c="gray">
              @{source.author.email.split("@")[0]}
            </Text>
            <Text component="p">{source.content}</Text>
            <Text component="span" size="xs" c="gray">
              Replying to{" "}
              <Text component="span" c="light-blue.6">
                @{source.author.email.split("@")[0]}
              </Text>
            </Text>
          </Grid.Col>
        </Grid>
        <CreateReplyForm sourceId={source.id} />
      </Modal>
    </>
  );
};
