import { Center, Loader, Stack } from "@mantine/core";
import { useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import {
  CreatePostForm,
  LikePostButton,
  ReplyButton,
  RepostButton,
} from "src/features/post";
import { $pending, $posts } from "./model";
export const Feed = () => {
  const [pending, posts] = useUnit([$pending, $posts]);
  return (
    <Stack maw={"100%"}>
      <CreatePostForm />
      {pending ? (
        <Center>
          <Loader />{" "}
        </Center>
      ) : (
        <Stack h="100%">
          {posts.map((post) => (
            <PostView
              key={post.id}
              post={post}
              layout={"feed"}
              controlButtons={{
                reply: (
                  <ReplyButton
                    repliesCount={post.repliesCount}
                    key={`replyButton ${post.id}`}
                    source={post}
                  />
                ),
                repost: (
                  <RepostButton
                    key={`repostButton ${post.id}`}
                    parentPost={post}
                  />
                ),
                like: (
                  <LikePostButton
                    key={`likeButton ${post.id}`}
                    postId={post.id}
                    likesCount={post.likesCount}
                    isLiked={post.isLiked}
                  />
                ),
              }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
