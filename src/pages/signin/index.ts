import { createRouteView } from "atomic-router-react";
import { anonymousRoute, currentRoute } from "./model";
import { SignInPage } from "./page";
import { PageLoader } from "src/shared/ui";

export const SigninRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: SignInPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
