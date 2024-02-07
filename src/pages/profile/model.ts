import { attach, createStore, sample } from "effector";
import * as api from "src/shared/api/user";
import { routes } from "src/shared/routing";
import { $user, chainAuthorized } from "src/shared/session";
export const currentRoute = routes.profile;
const getUserFx = attach({ effect: api.getUserFx });

export const $isCurrentUser = createStore(false);
export const $profile = createStore<api.User | null>(null);
$profile.on(getUserFx.doneData, (_, user) => user);
$profile.watch((c) => console.log(c, ">>USER"));
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});
sample({
  clock: [authorizedRoute.opened, authorizedRoute.$params],
  source: authorizedRoute.$params,
  filter: ({ id }) => {
    if (!id) {
      console.log("No id");
      return false;
    }
    return true;
  },
  fn: ({ id }) => id,
  target: getUserFx,
});
sample({
  clock: getUserFx.doneData,
  source: $user,
  fn: (sessionUser, { id }) => {
    if (!sessionUser) return false;
    return sessionUser.id === id;
  },
  target: $isCurrentUser,
});

authorizedRoute.opened.watch(() => {
  console.info(`Profile route opened `);
});
