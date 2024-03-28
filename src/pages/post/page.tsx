import { useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import {
  BookmarkButton,
  CreateReplyForm,
  LikePostButton,
  ReplyButton,
  RepostButton,
} from "src/features/post";
import { $post } from "src/pages/post/model";
import { BaseLayout } from "src/shared/ui";
import { Header } from "src/widgets/header";
import { Sidebar } from "src/widgets/sidebar";
export const PostPage = () => {
  return (
    <BaseLayout sidebar={<Sidebar />} header={<Header />} main={<Main />} />
  );
};
function Main() {
  const post = useUnit($post);

  if (!post) return;
  console.log(post.childPosts, "CHILD POSTS>>>");

  return (
    <>
      <PostView
        key={post.id}
        post={post}
        layout={"post"}
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
              bookmarked={post.bookmarked}
            />
          ),
        }}
      />

      <CreateReplyForm sourceId={post.id} />
      {post.childPosts.map((p) => (
        <PostView
          isPostPage
          key={p.id}
          post={p}
          layout={"post"}
          controlButtons={{
            reply: (
              <ReplyButton
                repliesCount={p.repliesCount}
                key={`replyButton ${p.id}`}
                source={p}
              />
            ),
            repost: (
              <RepostButton key={`repostButton ${p.id}`} parentPost={p} />
            ),
            like: (
              <LikePostButton
                key={`likeButton ${p.id}`}
                postId={p.id}
                likesCount={p._count.likes}
                isLiked={p.isLiked}
              />
            ),
            bookmark: (
              <BookmarkButton
                key={`bookmark button ${p.id}`}
                postId={p.id}
                count={p._count.bookmarks}
                bookmarked={p.bookmarked}
              />
            ),
          }}
        />
      ))}
    </>
  );
}
