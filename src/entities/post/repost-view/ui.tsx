import { Box, Group, Avatar, Text } from "@mantine/core";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
import { Post } from "src/shared/api/post";
import { FC } from "react";
import { ImagesView } from "src/shared/ui";
interface RepostViewProps {
  repost: Post;
  variant: "collapsed" | "full";
}
export const RepostView: FC<RepostViewProps> = ({ repost, variant }) => {
  return (
    <Box className={styles["repost"]}>
      <Group gap={5}>
        <Avatar src={getImgUrl(repost.author.avatar)} size={20} />
        <Text>{repost.author.username}</Text>
        <Text c={"gray"}>@{repost.author.email.split("@")[0]}</Text>
      </Group>

      <p>{repost.content}</p>
      {variant === "collapsed" ? (
        <Text c={"gray"}>{repost.images[0]}</Text>
      ) : (
        <ImagesView images={repost.images} />
      )}
    </Box>
  );
};
