import { Center, Loader, Stack } from "@mantine/core";
import { useList, useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import { ReplyButton } from "src/entities/reply";
import { CreatePostForm, LikePostButton } from "src/features/post";
import { CreateReplyForm } from "src/features/reply";
import { $pending, $posts } from "src/widgets/feed/model";
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
            key={"replyButton"}
            replyPostForm={<CreateReplyForm sourceId={post.id} />}
          />,
          <LikePostButton
            key={"likeButton"}
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
