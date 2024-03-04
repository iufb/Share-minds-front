import { attach, createEvent, sample } from "effector";
import * as api from "src/shared/api/post";
//effects
const createBookmarkFx = attach({ effect: api.createBookmarkFx });
const deleteBookmarkFx = attach({ effect: api.deleteBookmarkFx });

//event
export const bookmarkBtnClicked = createEvent<number>();
export const unbookmarkBtnClicked = createEvent<number>();

sample({
  clock: bookmarkBtnClicked,
  fn: (postId) => ({ postId }),
  target: createBookmarkFx,
});

sample({
  clock: unbookmarkBtnClicked,
  fn: (postId) => ({ postId }),
  target: deleteBookmarkFx,
});
