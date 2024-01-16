import { createRoutesView } from "atomic-router-react";
import { AccessHubRoute } from "src/pages/access-hub";
import { SigninRoute } from "src/pages/signin";
import { SignupRoute } from "src/pages/signup";
import { HomeRoute } from "src/pages/home";
import { ExploreRoute } from "src/pages/explore";

export const RoutesView = createRoutesView({
  routes: [AccessHubRoute, SignupRoute, SigninRoute, HomeRoute, ExploreRoute],
});
