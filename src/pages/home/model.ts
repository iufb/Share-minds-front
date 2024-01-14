import { chainRoute } from "atomic-router";
import { getPostsFx } from "src/widgets/feed/model";
import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";
import { startLoadPosts } from "src/widgets/feed/model";
import { sample } from "effector";

export const currentRoute = routes.home;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});
// export const homeRoute = chainRoute({
//   route: authorizedRoute,
//   beforeOpen: { effect: getPostsFx, mapParams: () => null },
//   openOn: getPostsFx.doneData,
//   cancelOn: getPostsFx.fail,
// });

sample({
  clock: authorizedRoute.opened,
  target: startLoadPosts,
});
authorizedRoute.opened.watch(() => {
  console.info("Home route opened");
});
