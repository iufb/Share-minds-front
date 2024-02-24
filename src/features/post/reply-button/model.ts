import { attach, createEvent, createStore, sample } from "effector";
import { createReplyFx } from "src/features/post";
import * as api from "src/shared/api/post";
const getRepliesCountFx = attach({ effect: api.getRepliesCountFx });
export const buttonMounted = createEvent<number>();
export const $repliesCount = createStore(0)
  .on(buttonMounted, (_, count) => count)
  .on(getRepliesCountFx.doneData, (_, count) => count);
sample({
  clock: createReplyFx.done,
  fn: ({ result }) => {
    return result.sourceId;
  },
  target: getRepliesCountFx,
});
