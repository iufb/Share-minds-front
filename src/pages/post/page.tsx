import { useUnit } from "effector-react";
import { PostView } from "src/entities/post";
import { LikePostButton } from "src/features/post";
import { CreateReplyForm } from "src/features/reply";
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
        layout="post"
        post={post}
        controlButtons={[
          <LikePostButton
            key={"likeButton"}
            postId={post.id}
            likesCount={post.likesCount}
            isLiked={post.isLiked}
          />,
        ]}
      />
      <CreateReplyForm sourceId={post.id} />
      {post.childPosts.map((post) => (
        <PostView
          layout="feed"
          key={post.id}
          post={post}
          controlButtons={[
            <LikePostButton
              key={"likeButton"}
              postId={post.id}
              likesCount={post.likesCount}
              isLiked={post.isLiked}
            />,
          ]}
        />
      ))}
    </>
  );
}
