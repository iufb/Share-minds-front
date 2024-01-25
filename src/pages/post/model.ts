import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";

export const currentRoute = routes.post;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});
// export const homeRoute = chainRoute({
//   route: authorizedRoute,
//   beforeOpen: { effect: getPostsFx, mapParams: () => null },
//   openOn: getPostsFx.doneData,
//   cancelOn: getPostsFx.fail,
// });

currentRoute.opened.watch(() => {
  console.info(`Post route opened ${currentRoute.$params.getState().id}`);
});
