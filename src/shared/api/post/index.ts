import { createEffect } from "effector";
import { User } from "src/shared/api/user";
import { requestFx } from "src/shared/utils";
export interface PostType {
  id: number;
  author: User;
  isRepost?: boolean;
  sourceId: number | null;
  source?: PostType;
  childPosts: PostType[];
  isLiked: boolean;
  likesCount: number;
  content: string;
  images: string[];
  repliesCount: number;
}
export interface CreatePostRequest extends FormData {}
export type CreatePostResponse = PostType;
export type PostError = {
  status: number;
  message: string;
  error: string;
};
export const createPostFx = createEffect<
  CreatePostRequest,
  CreatePostResponse,
  PostError
>((form) => {
  return requestFx({
    path: "posts",
    method: "POST",
    body: { multipart: form },
  });
});
export const getPostsFx = createEffect<void, PostType[], PostError>(() =>
  requestFx({
    path: "posts",
    method: "GET",
  }),
);
export const getPostFx = createEffect<number, PostType, PostError>((id) =>
  requestFx({ path: `posts/${id}`, method: "GET" }),
);
export interface RepostCountResponse {
  count: number;
  isReposted: boolean;
  repostId: number;
}
export const unrepostFx = createEffect<number, { status: string }, PostError>(
  (id) => requestFx({ path: `posts/${id}`, method: "DELETE" }),
);
export const getRepostsCountFx = createEffect<
  number,
  RepostCountResponse,
  PostError
>((id) => requestFx({ path: `posts/repostsCount/${id}`, method: "GET" }));
interface LikePostRequest {
  sourceId: number;
}
interface UnlikePostRequest {
  sourceId: number;
}

interface LikePostResponse {
  userId: number;
  postId: number;
}

export const likePostFx = createEffect<LikePostRequest, LikePostResponse>(
  (body) => requestFx({ path: "likes", method: "POST", body: { json: body } }),
);
export const unlikePostFx = createEffect<UnlikePostRequest, LikePostResponse>(
  ({ sourceId }) =>
    requestFx({
      path: `likes/${sourceId}`,
      method: "DELETE",
    }),
);
