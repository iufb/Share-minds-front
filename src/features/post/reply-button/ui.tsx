import { Avatar, Box, Grid, Modal, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMessageCircle } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { ReactPanelButton } from "src/entities/post";
import { CreateReplyForm } from "src/features/post";
import { Post } from "src/shared/api/post";
import { getImgUrl, getNickname } from "src/shared/utils";
import styles from "./ui.module.css";
import { useUnit } from "effector-react";
import { $repliesCount, buttonMounted } from "./model";
interface ReplyButtonProps {
  repliesCount: number;
  source: Post;
}
export const ReplyButton: FC<ReplyButtonProps> = ({ source }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const repliesCount = useUnit($repliesCount);
  const fullScreenModal = useMediaQuery("(max-width: 500px)");
  useEffect(() => {
    buttonMounted({ sourceId: source.id });
  }, []);
  return (
    <>
      <ReactPanelButton
        icon={<IconMessageCircle size={18} />}
        quantity={repliesCount ? repliesCount[source.id] : 0}
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
              {getNickname(source.author.email)}
            </Text>
            <Text component="p">{source.content}</Text>
            <Text component="span" size="xs" c="gray">
              Replying to{" "}
              <Text component="span" c="light-blue.6">
                {getNickname(source.author.email)}
              </Text>
            </Text>
          </Grid.Col>
        </Grid>
        <CreateReplyForm sourceId={source.id} />
      </Modal>
    </>
  );
};
