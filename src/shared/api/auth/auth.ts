import { createEffect } from "effector";
import { requestFx } from "src/shared/api/request";

interface SigninRequest {
  email: string;
  password: string
}
export type SigninResponse = {
  accessToken: string

}

export const signInFx = createEffect<SigninRequest, SigninResponse>((form) => {
  return requestFx({
    path: 'auth/signin',
    method: 'POST',
    body: { json: form }
  })
})
