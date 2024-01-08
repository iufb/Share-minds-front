import { createRoutesView } from "atomic-router-react";
import { AccessHubRoute } from "./access-hub";
import { SigninRoute } from "./signin";
import { SignupRoute } from "./signup";
import { HomeRoute } from "src/pages/home";

export const RoutesView = createRoutesView({
  routes: [AccessHubRoute, SignupRoute, SigninRoute, HomeRoute],
});
