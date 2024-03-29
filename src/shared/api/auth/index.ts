import { createEffect } from "effector";
import { User } from "src/shared/api/user";
import { requestFx } from "src/shared/utils";
type ResponseError = {
  error: string;
  message: string;
  statusCode: number;
};
export interface SignInRequest {
  email: string;
  password: string;
}
export type SignInResponse = {
  status: string;
};
export type SignInError = ResponseError;

export const signInFx = createEffect<
  SignInRequest,
  SignInResponse,
  SignInError
>((form) => {
  return requestFx({
    path: "auth/signin",
    method: "POST",
    body: { json: form },
  });
});
export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}
export type SignUpResponse = {
  status: string;
};
export type SignUpError = ResponseError;
export const signUpFx = createEffect<
  SignInRequest,
  SignInResponse,
  SignInError
>((form) => {
  return requestFx({
    path: "auth/signup",
    method: "POST",
    body: { json: form },
  });
});
export const signOutFx = createEffect(() =>
  requestFx({ path: "auth/logout", method: "GET" }),
);
export type GetSessionError = ResponseError;
export const getSessionFx = createEffect<void, User, GetSessionError>(() =>
  requestFx({
    path: "auth/session",
    method: "GET",
  }),
);
