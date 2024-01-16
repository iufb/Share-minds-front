import { Avatar, Box, Grid, Group } from "@mantine/core";
import { FC } from "react";
import { Post } from "src/shared/api/post";
import styles from "./ui.module.css";
import clsx from "clsx";
interface IPostView {
  post: Post;
}
export const PostView: FC<IPostView> = ({ post }) => {
  return (
    <Grid maw={"630px"} ml={5}>
      <Grid.Col span={2} className={styles["avatar"]}>
        <Avatar />
      </Grid.Col>
      <Grid.Col span={10}>
        <Box>{post.author.username}</Box>
        <Box>{post.content}</Box>
        <ImagesView images={post.images} />
      </Grid.Col>
    </Grid>
  );
};

const ImagesView = ({ images }: { images: string[] }) => {
  const imgSrc = (img: string) => `${import.meta.env.VITE_BASE_URL}/${img}`;
  if (images.length == 0) return;
  return (
    <div
      className={clsx(styles["imagesContainer"], {
        [styles["one"]]: images.length == 1,
        [styles["two"]]: images.length == 2,
        [styles["three"]]: images.length == 3,
      })}
    >
      {images.map((image) => (
        <img src={imgSrc(image)} className={styles["image"]} />
      ))}
    </div>
  );
};
