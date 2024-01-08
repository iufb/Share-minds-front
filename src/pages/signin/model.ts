import { routes } from "src/shared/routing";
import { chainAnonymous } from "src/shared/session";

export const currentRoute = routes.auth.signin;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
});
