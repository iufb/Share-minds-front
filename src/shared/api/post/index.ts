import { createEffect } from "effector";
import { UserFullData } from "src/shared/api/user";
import { requestFx } from "src/shared/utils";
export interface PostType {
  id: number;
  author: UserFullData;
  isLiked: boolean;
  likesCount: number;
  content: string;
  images: string[];
}
export interface CreatePostRequest extends FormData {}
export type CreatePostResponse = {
  status: string;
};
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
interface LikePostRequest {
  likeFor: string;
  sourceId: number;
}
interface UnlikePostRequest {
  likeFor: string;
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
  ({ likeFor, sourceId }) =>
    requestFx({
      path: `likes/${sourceId}`,
      method: "DELETE",
      query: { likeFor },
    }),
);
