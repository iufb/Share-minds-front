import {
  UnmappedRouteObject,
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { appStarted } from "./config";
import { createBrowserHistory } from "history";

export const routes = {
  accessHub: createRoute(),
  auth: {
    signin: createRoute(),
    signup: createRoute(),
  },
  home: createRoute(),
  explore: createRoute(),
  bookmarks: createRoute(),
  profile: createRoute(),
};

const routesMap: UnmappedRouteObject<any>[] = [
  {
    path: "/",
    route: routes.accessHub,
  },
  {
    path: "/signup",
    route: routes.auth.signup,
  },
  {
    path: "/signin",
    route: routes.auth.signin,
  },
  {
    path: "/home",
    route: routes.home,
  },
  {
    path: "/explore",
    route: routes.explore,
  },
  {
    path: "/bookmarks",
    route: routes.bookmarks,
  },
  {
    path: "/profile",
    route: routes.profile,
  },
];
export const controls = createRouterControls();
export const router = createHistoryRouter({
  routes: routesMap,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
