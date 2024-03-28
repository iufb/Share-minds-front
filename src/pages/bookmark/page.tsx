import { Box, Title, Text, Group } from "@mantine/core";
import { useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import {
  ReplyButton,
  RepostButton,
  LikePostButton,
  BookmarkButton,
} from "src/features/post";
import { $bookmarks } from "src/pages/bookmark/model";
import { $user } from "src/shared/session";
import { BaseLayout } from "src/shared/ui";
import { getNickname } from "src/shared/utils";
import { Header } from "src/widgets/header";
import { Sidebar } from "src/widgets/sidebar";

export const BookmarksPage = () => {
  return (
    <BaseLayout sidebar={<Sidebar />} header={<Header />} main={<Main />} />
  );
};

function Main() {
  const [user, bookmarks] = useUnit([$user, $bookmarks]);
  console.log(bookmarks);

  return (
    <Box px={16}>
      <Title size="h3" order={1}>
        Bookmarks
        <Text size="xs" c={"gray"}>
          {getNickname(user?.email)}
        </Text>
      </Title>
      {bookmarks.map((post) => (
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
              <RepostButton key={`repostButton ${post.id}`} parentPost={post} />
            ),
            like: (
              <LikePostButton
                key={`likeButton ${post.id}`}
                postId={post.id}
                likesCount={post._count.likes}
                isLiked={post.isLiked}
              />
            ),
            bookmark: (
              <BookmarkButton
                key={`bookmark button ${post.id}`}
                postId={post.id}
                count={post._count.bookmarks}
                //TODO
                bookmarked={post.bookmarked}
              />
            ),
          }}
        />
      ))}
    </Box>
  );
}
