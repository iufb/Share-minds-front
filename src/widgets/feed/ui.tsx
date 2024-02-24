import { Center, Loader, Stack } from "@mantine/core";
import { useList, useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import {
  CreatePostForm,
  LikePostButton,
  ReplyButton,
  RepostButton,
} from "src/features/post";
import { $pending, $posts } from "./model";
export const Feed = () => {
  const pending = useUnit($pending);
  const posts = useList($posts, {
    getKey: ({ id }) => id,
    fn: (post) => (
      <PostView
        key={post.id}
        post={post}
        layout={"feed"}
        controlButtons={[
          <ReplyButton
            repliesCount={post.repliesCount}
            key={`replyButton ${post.id}`}
            source={post}
          />,
          <RepostButton key={`repostButton ${post.id}`} parentPost={post} />,
          <LikePostButton
            key={`likeButton ${post.id}`}
            postId={post.id}
            likesCount={post.likesCount}
            isLiked={post.isLiked}
          />,
        ]}
      />
    ),
  });
  return (
    <Stack maw={"100%"}>
      <CreatePostForm />
      {pending ? (
        <Center>
          <Loader />{" "}
        </Center>
      ) : (
        <Stack h="100%">{posts}</Stack>
      )}
    </Stack>
  );
};
