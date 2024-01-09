import { HomePage } from "./page";
import { authorizedRoute, currentRoute } from "./model";
import { createRouteView } from "atomic-router-react";
import { PageLoader } from "src/shared/ui";

export const HomeRoute = {
  view: createRouteView({
    route: authorizedRoute,
    view: HomePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
