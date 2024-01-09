import { createRouteView } from "atomic-router-react";
import { PageLoader } from "src/shared/ui";
import { anonymousRoute, currentRoute } from "./model";
import { SignupPage } from "./page";

export const SignupRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: SignupPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
