import { createStore, sample } from "effector";
import { routes } from "src/shared/routing";
import { $user, chainAuthorized } from "src/shared/session";
export const currentRoute = routes.profile;

export const $isCurrentUser = createStore(false);

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});

sample({
  clock: authorizedRoute.opened,
  source: { params: authorizedRoute.$params, user: $user },
  fn: ({ params, user }) => {
    if (!user) return false;
    return params.id === user.id;
  },
  target: $isCurrentUser,
});

authorizedRoute.opened.watch(() => {
  console.info(`Profile route opened `);
});
