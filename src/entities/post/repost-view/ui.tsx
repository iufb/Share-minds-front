import { Box, Group, Avatar, Text } from "@mantine/core";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
import { Post } from "src/shared/api/post";
import { FC } from "react";
import { ImagesView } from "src/shared/ui";
import { IconRepeat } from "@tabler/icons-react";
interface RepostViewProps {
  repost: Post;
  variant: "collapsed" | "full";
}
// 0. Content null >>  title:<RepostIcon/> You reposted,  variant : full
//    a. if it is repost >> repost content + sourcePost with border,  variant : full
// 1. Content not null >> quote ,variat: full, without title
//    a. if it is repost >> your content + repostContent with border, variant :  collapsed
// 2. View for create repost modal >> base
export const RepostView: FC<RepostViewProps> = ({ repost, variant }) => {
  return (
    <Box className={styles["repost"]} mb={5}>
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
