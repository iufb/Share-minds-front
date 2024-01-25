import { attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/post";
//effects
const likePostFx = attach({ effect: api.likePostFx });
const unlikePostFx = attach({ effect: api.unlikePostFx });

//store
export const $likeStatus = createStore<boolean | null>(null);

//event
export const likePostClicked = createEvent<{ sourceId: number }>();
export const unLikePostClicked = createEvent<number>();

sample({
  clock: likePostClicked,
  fn: ({ sourceId }) => ({ sourceId, likeFor: "post" }),
  target: likePostFx,
});

sample({
  clock: unLikePostClicked,
  fn: (id) => ({ sourceId: id, likeFor: "post" }),
  target: unlikePostFx,
});
