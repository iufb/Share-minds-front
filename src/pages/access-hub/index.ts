import { AccessHubPage } from "./page";
import { anonymousRoute, currentRoute } from "./model";
import { createRouteView } from "atomic-router-react";
import { PageLoader } from "src/shared/ui";

export const AccessHubRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: AccessHubPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
