import { attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/post";
const getLikedPostsFx = attach({ effect: api.getLikedPostsFx });
const getUserReplies = attach({ effect: api.getUserReplies });
const getUserPosts = attach({ effect: api.getUserPosts });
//stores
export const $activeTab = createStore<string | null>("Posts");
export const $tabContent = createStore<api.Post[]>([]);
//events
export const changeActiveTab = createEvent<string | null>();

$activeTab.on(changeActiveTab, (_, tab) => tab);

sample({
  clock: $activeTab,
  filter: (tab) => tab === "Likes",
  target: getLikedPostsFx,
});

sample({
  clock: $activeTab,
  filter: (tab) => tab === "Replies",
  target: getUserReplies,
});
sample({
  clock: $activeTab,
  filter: (tab) => tab === "Posts",
  target: getUserPosts,
});

$tabContent.on(getLikedPostsFx.doneData, (_, res) => res);
$tabContent.on(getUserReplies.doneData, (_, res) => res);
$tabContent.on(getUserPosts.doneData, (_, res) => res);
