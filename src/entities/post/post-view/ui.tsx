import { Avatar, Box, Grid, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import { PostType } from "src/shared/api/post";
import styles from "./ui.module.css";
import clsx from "clsx";
import { Link } from "atomic-router-react";
import { routes } from "src/shared/routing";
import { PostReactPanel } from "src/entities/post";
import { getImgUrl } from "src/shared/utils";
interface PostViewProps {
  post: PostType;
  layout?: "feed" | "post";
  controlButtons: ReactNode[];
}
export const PostView: FC<PostViewProps> = ({
  post,
  controlButtons,
  layout = "feed",
}) => {
  const isFeed = layout === "feed";
  return (
    <Grid className={styles["wrapper"]} px={isFeed ? 5 : 20}>
      {isFeed && (
        <Grid.Col span={2} className={styles["avatar"]}>
          <Link
            to={routes.profile}
            params={{
              id: post.author.id,
            }}
          >
            <Avatar color="light-blue.9" src={getImgUrl(post.author.avatar)} />
          </Link>
        </Grid.Col>
      )}
      <Grid.Col span={isFeed ? 10 : 12}>
        <PostHeader post={post} isFeed={isFeed} layout={layout} />
        {isFeed ? (
          <Link to={routes.post} params={{ id: post.id }}>
            <Box my={10}>{post.content}</Box>
          </Link>
        ) : (
          <Box my={10}>{post.content}</Box>
        )}
        <ImagesView images={post.images} />
        <PostReactPanel showBorder={!isFeed} controlButtons={controlButtons} />
      </Grid.Col>
    </Grid>
  );
};
interface PostHeaderProps {
  post: PostType;
  isFeed: boolean;
  layout: "feed" | "post";
}
const PostHeader: FC<PostHeaderProps> = ({ post, isFeed, layout }) => (
  <Link
    className={styles["postHeader"]}
    to={routes.profile}
    params={{ id: post.author.id }}
  >
    {!isFeed && (
      <Avatar
        color="light-blue.9"
        src={getImgUrl(post.author.avatar)}
        size={!isFeed ? 50 : 35}
        radius="sm"
      />
    )}
    <Box
      className={clsx(
        {
          feed: styles["row"],
          post: styles["column"],
        }[layout],
      )}
    >
      {post.author.username}
      <Text component="h4" size="sm" c="gray">
        @{post.author.email.split("@")[0]}
      </Text>
    </Box>
  </Link>
);
const ImagesView = ({ images }: { images: string[] }) => {
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
        <img key={image} src={getImgUrl(image)} className={styles["image"]} />
      ))}
    </div>
  );
};
