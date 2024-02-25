import { attach, createEvent, createStore, sample } from "effector";
import { createReplyFx } from "src/features/post";
import * as api from "src/shared/api/post";
const getRepliesCountFx = attach({ effect: api.getRepliesCountFx });
export const buttonMounted = createEvent<{ sourceId: number }>();
export const $repliesCount = createStore<null | Record<number, number>>(
  null,
).on(getRepliesCountFx.doneData, (state, { sourceId, count }) => ({
  ...state,
  [sourceId]: count,
}));
sample({
  clock: buttonMounted,
  fn: ({ sourceId }) => sourceId,
  target: getRepliesCountFx,
});
sample({
  clock: createReplyFx.done,
  fn: ({ result }) => {
    return result.sourceId;
  },
  target: getRepliesCountFx,
});
