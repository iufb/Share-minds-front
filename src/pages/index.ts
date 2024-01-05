import { createRoutesView } from "atomic-router-react";
import { AccessHubRoute } from "./access-hub";
import { SigninRoute } from "./signin";
import { SignupRoute } from "./signup";

export const RoutesView = createRoutesView({
  routes: [AccessHubRoute, SignupRoute, SigninRoute]
})
