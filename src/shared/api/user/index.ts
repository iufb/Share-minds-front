import { createEffect } from "effector";
import { User } from "src/shared/api/auth";
import { requestFx } from "src/shared/utils";
export type UserFullData = User & {
  cover?: string;
  avatar?: string;
  createdAt: string;
  bio?: string;
};
export const getUserFx = createEffect<
  { id: number },
  UserFullData,
  { status: number; error: string; message: string }
>(({ id }) =>
  requestFx({
    path: `users/${id}`,
    method: "GET",
  }),
);
