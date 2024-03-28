import { authorizedRoute, currentRoute } from "./model";
import { createRouteView } from "atomic-router-react";
import { BookmarksPage } from "src/pages/bookmark/page";
import { PostPage } from "src/pages/post/page";
import { PageLoader } from "src/shared/ui";
export const BookmarksRoute = {
  view: createRouteView({
    route: authorizedRoute,
    view: BookmarksPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
