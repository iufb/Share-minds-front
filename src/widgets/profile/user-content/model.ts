import { attach, createEvent, createStore, sample } from "effector";
import { or } from "patronum";
import { currentRoute } from "src/pages/profile/model";
import * as api from "src/shared/api/post";
const getLikedPostsFx = attach({ effect: api.getLikedPostsFx });
const getUserRepliesFx = attach({ effect: api.getUserReplies });
const getUserPostsFx = attach({ effect: api.getUserPosts });
export const $loading = or(
  getUserPostsFx.pending,
  getUserRepliesFx.pending,
  getLikedPostsFx.pending,
);
//stores
export const $activeTab = createStore<string | null>("Posts");
export const $tabContent = createStore<api.Post[]>([]);
//events
export const changeActiveTab = createEvent<string | null>();

$activeTab.on(changeActiveTab, (_, tab) => tab);
sample({
  clock: currentRoute.updated,
  fn: () => "Posts",
  target: changeActiveTab,
});
sample({
  clock: changeActiveTab,
  source: currentRoute.$params,
  fn: ({ id }) => id,
  filter: (id, tab) => tab === "Likes",
  target: getLikedPostsFx,
});

sample({
  clock: changeActiveTab,
  source: currentRoute.$params,
  fn: ({ id }) => id,
  filter: (id, tab) => tab === "Replies",
  target: getUserRepliesFx,
});
sample({
  clock: changeActiveTab,
  source: currentRoute.$params,
  fn: ({ id }) => id,
  filter: (id, tab) => tab === "Posts",
  target: getUserPostsFx,
});

$tabContent.on(
  [
    getLikedPostsFx.doneData,
    getUserRepliesFx.doneData,
    getUserPostsFx.doneData,
  ],
  (_, res) => res,
);
