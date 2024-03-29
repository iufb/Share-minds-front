import { attach, createStore, sample } from "effector";
import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";
import { createReplyFx } from "src/features/post";
import * as api from "src/shared/api/post";
const getPostFx = attach({ effect: api.getPostFx });
export const currentRoute = routes.post;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});
export const $post = createStore<api.Post | null>(null);
$post.watch((p) => console.log(p?.childPosts));
$post.on(getPostFx.done, (_, { result }) => result);
sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$params,
  fn: ({ id }) => id,
  target: getPostFx,
});
sample({
  clock: [authorizedRoute.$params, createReplyFx.done],
  source: authorizedRoute.$params,
  fn: ({ id }) => id,
  target: getPostFx,
});
