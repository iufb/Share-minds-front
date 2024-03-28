import { attach, createEvent, createStore, sample } from "effector";
import { createPostFx } from "src/features/post";
import * as api from "src/shared/api/post";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import { createToggle } from "src/shared/utils";
//Effects
const createRepostFx = attach({ effect: api.createPostFx });
const unrepostFx = attach({ effect: api.unrepostFx });
const getRepostsCount = attach({ effect: api.getRepostsCountFx });

//Events
export const repostButtonClicked = createEvent<number>();
export const unrepostButtonClicked = createEvent();
export const quoteButtonClicked = createEvent();
export const buttonMounted = createEvent<number>();

//Stores
export const repostModalStatus = createToggle();
const $postId = createStore<number | null>(null);
export const $repostsInfo = createStore<Record<
  number,
  api.RepostCountResponse
> | null>(null);
$repostsInfo.on(getRepostsCount.doneData, (state, result) => ({
  ...state,
  [result.sourceId]: result,
}));
$postId.on(buttonMounted, (_, id) => id);
sample({
  clock: buttonMounted,
  target: getRepostsCount,
});
sample({
  clock: createPostFx.done,
  source: $postId,
  filter: (postId: number | null): postId is number => postId !== null,
  fn: (postId) => ({ id: postId, value: false }),
  target: repostModalStatus.change,
});

// Refetch repost count when new repost created
type ValidSource = { sourceId: number } & api.Post;
type UnvalidSource = { sourceId: null } & api.Post;
sample({
  clock: createRepostFx.doneData,
  filter: (clock: ValidSource | UnvalidSource): clock is ValidSource =>
    !!clock.sourceId,
  fn: ({ sourceId }) => sourceId,
  target: getRepostsCount,
});

//Create repost without quote
sample({
  clock: repostButtonClicked,
  source: $user,
  filter: (source: User | null): source is User => typeof source === "object",
  fn: (user, sourceId) => {
    const formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({ sourceId, authorId: user.id, isRepost: true }),
    );
    return formData;
  },
  target: createRepostFx,
});
//Unrepost
type UnrepostValidSource = {
  info: Record<number, api.RepostCountResponse>;
  id: number;
};
type UnrepostInvalidSource = {
  info: null;
  id: null;
};
type Source = UnrepostValidSource | UnrepostInvalidSource;
sample({
  clock: unrepostButtonClicked,
  source: { info: $repostsInfo, id: $postId },
  filter: (source: Source): source is UnrepostValidSource => {
    if (typeof source.info === "object" && typeof source.id === "number") {
      return true;
    } else {
      return false;
    }
  },
  fn: ({ info, id }) => info[id],
  target: unrepostFx,
});

sample({
  clock: unrepostFx.doneData,
  source: $postId,
  filter: (postId): postId is number => typeof postId === "number",
  target: getRepostsCount,
});
