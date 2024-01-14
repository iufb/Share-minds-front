import { Center, Loader, Stack } from "@mantine/core";
import { useList, useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import { CreatePostForm } from "src/features/post";
import { $pending, $posts } from "src/widgets/feed/model";

export const Feed = () => {
  const pending = useUnit($pending);
  const posts = useList($posts, {
    getKey: ({ id }) => id,
    fn: (post) => <PostView post={post} />,
  });
  return (
    <Stack maw={"100%"}>
      <CreatePostForm />
      {pending ? (
        <Center>
          <Loader />{" "}
        </Center>
      ) : (
        <Stack>{posts}</Stack>
      )}
    </Stack>
  );
};