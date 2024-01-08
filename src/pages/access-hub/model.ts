import { routes } from "src/shared/routing";
import { chainAnonymous } from "src/shared/session";

export const currentRoute = routes.accessHub;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
});
anonymousRoute.opened.watch(() => {
  console.info("Access route opened");
});
