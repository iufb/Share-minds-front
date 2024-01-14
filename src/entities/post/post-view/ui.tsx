import { Avatar, Box, Grid } from "@mantine/core";
import { FC } from "react";
import { Post } from "src/shared/api/post";
interface IPostView {
  post: Post;
}
export const PostView: FC<IPostView> = ({ post }) => {
  return (
    <Grid maw={"630px"}>
      <Grid.Col span={2}>
        <Avatar />
      </Grid.Col>
      <Grid.Col span={10}>
        <Box>{post.author.username}</Box>
        <Box>{post.content}</Box>
      </Grid.Col>
    </Grid>
  );
};
