import { attach, createEvent, createStore, sample } from "effector";
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
export const $repostsInfo = createStore<api.RepostCountResponse | null>(null);
$repostsInfo.on(getRepostsCount.doneData, (_, count) => count);

sample({
  clock: buttonMounted,
  target: getRepostsCount,
});

// Refetch repost count when new repost created
type ValidSource = { sourceId: number } & api.PostType;
type UnvalidSource = { sourceId: null } & api.PostType;
sample({
  clock: createRepostFx.doneData,
  filter: (clock: ValidSource | UnvalidSource): clock is ValidSource =>
    !!clock.sourceId,
  fn: ({ sourceId }) => sourceId,
  target: [getRepostsCount, repostModalStatus.closed],
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
$repostsInfo.watch((w) => console.log(w));
sample({
  clock: unrepostButtonClicked,
  source: $repostsInfo,
  filter: (
    source: api.RepostCountResponse | null,
  ): source is api.RepostCountResponse => typeof source == "object",
  fn: ({ repostId }) => repostId,
  target: unrepostFx,
});

sample({
  clock: unrepostFx.doneData,
  source: buttonMounted,
  target: getRepostsCount,
});
