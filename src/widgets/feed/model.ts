import { attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/post";
import { $isRepost, createPostFx } from "src/features/post";
export const startLoadPosts = createEvent();
export const getPostsFx = attach({ effect: api.getPostsFx });
export const $posts = createStore<api.Post[]>([]);
export const $pending = getPostsFx.pending;
$posts.on(getPostsFx.doneData, (_, posts) => posts);
sample({
  clock: startLoadPosts,
  target: getPostsFx,
});
$isRepost.watch((v) => console.log(v, ">>>"));
sample({
  clock: createPostFx.doneData,
  source: $isRepost,
  filter: (isRepost) => !isRepost,
  target: getPostsFx,
});
// $posts.on(createPostFx.doneData, (posts, newPost) => [...posts, newPost]);
