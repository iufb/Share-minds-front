import { Store, attach, createStore, sample } from "effector";
import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";
import * as api from "src/shared/api/user";
const getUserFx = attach({ effect: api.getUserFx });
export const currentRoute = routes.profile;

export const $userInfo = createStore<api.UserFullData | null>(null);

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});

sample({
  clock: authorizedRoute.opened,
  source: authorizedRoute.$params as Store<{ id: number }>,
  target: getUserFx,
});

$userInfo.on(getUserFx.done, (_, { result }) => result);
authorizedRoute.opened.watch(() => {
  console.info(`Profile route opened `);
});
