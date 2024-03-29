import { RouteInstance, RouteParams } from "atomic-router";
import { createRouteView } from "atomic-router-react";
import { currentRoute } from "src/pages/profile/model";
import { authorizedRoute } from "src/pages/profile/model";
import { ProfilePage } from "src/pages/profile/page";
import { PageLoader } from "src/shared/ui";
export const ProfileRoute = {
  view: createRouteView({
    route: authorizedRoute as unknown as RouteInstance<RouteParams>,
    view: ProfilePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
