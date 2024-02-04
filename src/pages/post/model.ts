import { attach, createStore, sample } from "effector";
import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";
import * as api from "src/shared/api/post";
const getPostFx = attach({ effect: api.getPostFx });
export const currentRoute = routes.post;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});
export const $post = createStore<api.PostType | null>(null);
$post.on(getPostFx.done, (_, { result }) => result);
$post.watch((p) => console.log(p));
sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$params,
  fn: ({ id }) => id,
  target: getPostFx,
});
sample({
  clock: authorizedRoute.$params,
  fn: ({ id }) => id,
  target: getPostFx,
});
