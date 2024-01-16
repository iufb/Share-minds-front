import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";

export const currentRoute = routes.explore;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});

authorizedRoute.opened.watch(() => {
  console.info("Explore route opened");
});
