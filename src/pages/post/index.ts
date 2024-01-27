import { RouteInstance, RouteParams } from "atomic-router";
import { authorizedRoute, currentRoute } from "./model";
import { createRouteView } from "atomic-router-react";
import { PostPage } from "src/pages/post/page";
import { PageLoader } from "src/shared/ui";
export const PostRoute = {
  view: createRouteView({
    route: authorizedRoute as unknown as RouteInstance<RouteParams>,
    view: PostPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
