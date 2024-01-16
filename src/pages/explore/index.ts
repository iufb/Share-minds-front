import { ExplorePage } from "./page";
import { authorizedRoute, currentRoute } from "./model";
import { createRouteView } from "atomic-router-react";
import { PageLoader } from "src/shared/ui";

export const ExploreRoute = {
  view: createRouteView({
    route: authorizedRoute,
    view: ExplorePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
