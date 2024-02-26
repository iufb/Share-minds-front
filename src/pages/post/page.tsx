import { useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import {
  LikePostButton,
  ReplyButton,
  CreateReplyForm,
  RepostButton,
} from "src/features/post";
import { $post } from "src/pages/post/model";
import { BaseLayout } from "src/shared/ui";
import { Sidebar } from "src/widgets/sidebar";
export const PostPage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<div>Header</div>}
      main={<Main />}
    />
  );
};
function Main() {
  const post = useUnit($post);

  if (!post) return;
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
              likesCount={post.likesCount}
              isLiked={post.isLiked}
            />
          ),
        }}
      />
      <CreateReplyForm sourceId={post.id} />

      {post.childPosts.map((post) => (
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
                likesCount={post.likesCount}
                isLiked={post.isLiked}
              />
            ),
          }}
        />
      ))}
    </>
  );
}
