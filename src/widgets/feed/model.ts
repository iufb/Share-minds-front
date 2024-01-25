import { attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/post";
export const startLoadPosts = createEvent();
export const getPostsFx = attach({ effect: api.getPostsFx });
export const $posts = createStore<api.PostType[]>([]);
export const $pending = getPostsFx.pending;
$posts.on(getPostsFx.doneData, (_, posts) => posts);
sample({
  clock: startLoadPosts,
  target: getPostsFx,
});
sample({
  clock: api.createPostFx.doneData,
  target: getPostsFx,
});
// $posts.on(createPostFx.doneData, (posts, newPost) => [...posts, newPost]);
