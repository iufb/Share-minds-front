import { routes } from "src/shared/routing";
import { chainAuthorized } from "src/shared/session";
import * as api from "src/shared/api/post";
import { attach, createStore, sample } from "effector";
const getBookmarksFx = attach({ effect: api.getBookmarksFx });
export const currentRoute = routes.bookmarks;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signin.open,
});

export const $bookmarks = createStore<api.Post[]>([]);
$bookmarks.on(getBookmarksFx.doneData, (_, bookmarks) => bookmarks);
sample({
  clock: authorizedRoute.opened,
  target: getBookmarksFx,
});
