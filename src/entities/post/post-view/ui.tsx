import { Avatar, Box, Grid, Text } from "@mantine/core";
import { FC, ReactElement, ReactNode, cloneElement } from "react";
import { Post } from "src/shared/api/post";
import styles from "./ui.module.css";
import clsx from "clsx";
import { Link } from "atomic-router-react";
import { routes } from "src/shared/routing";
import { PostReactPanel } from "src/entities/post";
import { getImgUrl } from "src/shared/utils";
import { ImagesView } from "src/shared/ui";
interface PostViewProps {
  post: Post;
  layout?: "feed" | "post";
  controlButtons: ReactNode[];
  isSource?: boolean;
}

export const PostView: FC<PostViewProps> = ({
  post,
  controlButtons,
  isSource,
  layout = "feed",
}) => {
  const isFeed = layout === "feed";

  return (
    <>
      {post.source && (
        <PostView
          isSource={true}
          post={post.source}
          controlButtons={controlButtons.map((btn, idx) => {
            if (idx === 0) {
              return cloneElement(
                btn as ReactElement<{
                  replyPostForm: ReactNode;
                  repliesCount: number;
                  source?: Post;
                }>,
                { source: post.source },
              );
            }
            return btn;
          })}
          layout={"feed"}
        />
      )}
      <Grid
        className={clsx(!isSource && styles["withBorder"])}
        px={isFeed ? 5 : 20}
      >
        {(isFeed || isSource) && (
          <Grid.Col span={2} className={styles["avatar"]}>
            <Link
              to={routes.profile}
              params={{
                id: post.author.id,
              }}
            >
              <Avatar
                color="light-blue.9"
                src={getImgUrl(post.author.avatar)}
              />
              {isSource && <hr className={styles["stroke"]} />}
            </Link>
          </Grid.Col>
        )}
        <Grid.Col span={isFeed ? 10 : 12}>
          <PostHeader post={post} isFeed={isFeed} layout={layout} />
          {isFeed ? (
            <Link to={routes.post} params={{ id: post.id }}>
              <Box my={0}>{post.content}</Box>
            </Link>
          ) : (
            <Box my={10}>{post.content}</Box>
          )}
          <ImagesView images={post.images} />
          <PostReactPanel
            showBorder={!isFeed}
            controlButtons={controlButtons}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
interface PostHeaderProps {
  post: Post;
  isFeed: boolean;
  layout: "feed" | "post";
}
const PostHeader: FC<PostHeaderProps> = ({ post, isFeed, layout }) => (
  <Link
    className={clsx(
      styles["postHeader"],
      !isFeed && styles["headerWithMargin"],
    )}
    to={routes.profile}
    params={{ id: post.author.id }}
  >
    {!isFeed && (
      <Avatar
        color="light-blue.9"
        src={getImgUrl(post.author.avatar)}
        size={!isFeed && !post.source ? 50 : 38}
        radius={!post.source ? "sm" : "xl"}
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
