import { Avatar, Box, Grid, Title } from "@mantine/core";
import { FC, ReactNode } from "react";
import { PostType } from "src/shared/api/post";
import styles from "./ui.module.css";
import clsx from "clsx";
import { Link } from "atomic-router-react";
import { routes } from "src/shared/routing";
import { PostReactPanel } from "src/entities/post";
interface PostViewProps {
  post: PostType;
  controlButtons: ReactNode[];
}
export const PostView: FC<PostViewProps> = ({ post, controlButtons }) => {
  return (
    <Grid mx={5}>
      <Grid.Col span={2} className={styles["avatar"]}>
        <Link
          to={routes.profile}
          params={{
            id: post.author.id,
          }}
        >
          <Avatar
            color="light-blue.9"
            src={import.meta.env.VITE_BASE_URL + "/" + post.author.avatar}
          />
        </Link>
      </Grid.Col>

      <Grid.Col span={10}>
        <Title size={19}>{post.author.username}</Title>
        <Link to={routes.post} params={{ id: post.id }}>
          <Box>{post.content}</Box>
        </Link>
        <ImagesView images={post.images} />
        <PostReactPanel controlButtons={controlButtons} />
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
        <img key={image} src={imgSrc(image)} className={styles["image"]} />
      ))}
    </div>
  );
};
