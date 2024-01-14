import { createEffect } from "effector";
import { User } from "src/shared/api/auth";
import { requestFx } from "src/shared/utils";
export interface Post {
  id: number;
  author: User;
  content: string;
}
export interface CreatePostRequest {
  content: string;
  authorId: number;
}
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
export const getPostsFx = createEffect<void, Post[], PostError>(() =>
  requestFx({
    path: "posts",
    method: "GET",
  }),
);
