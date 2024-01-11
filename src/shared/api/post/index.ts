import { createEffect } from "effector";
import { requestFx } from "src/shared/utils";
export interface CreatePostRequest {
  content: string;
  authorId: number;
}
export type CreatePostResponse = {
  status: string;
};
export type CreatePostError = {
  status: number;
  message: string;
  error: string;
};
export const createPostFx = createEffect<
  CreatePostRequest,
  CreatePostResponse,
  CreatePostError
>((form) => {
  return requestFx({
    path: "posts",
    method: "POST",
    body: { json: form },
  });
});
