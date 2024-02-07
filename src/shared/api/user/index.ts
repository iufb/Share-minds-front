import { createEffect } from "effector";
import { requestFx } from "src/shared/utils";
export type User = {
  id: number;
  email: string;
  username: string;
  cover?: string;
  avatar?: string;
  createdAt: string;
  bio?: string;
};
type UserError = { status: number; error: string; message: string };
export const getUserFx = createEffect<number, User, UserError>((id) =>
  requestFx({
    path: `users/${id}`,
    method: "GET",
  }),
);
export const editUserFx = createEffect<
  { data: FormData; id: number },
  User,
  UserError
>(({ data, id }) =>
  requestFx({
    path: `users/${id}`,
    method: "PATCH",
    body: { multipart: data },
  }),
);
