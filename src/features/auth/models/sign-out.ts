import { attach, createEvent, sample } from "effector";
import * as api from "src/shared/api/auth";
import { sessionRequestFx } from "src/shared/session";
const signOutFx = attach({ effect: api.signOutFx });
export const signOutButtonClicked = createEvent();

sample({
  clock: signOutButtonClicked,
  target: signOutFx,
});

sample({
  clock: signOutFx.done,
  target: sessionRequestFx,
});
