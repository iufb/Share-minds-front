import { attach, createEvent, createStore, sample } from "effector";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import { createField } from "src/shared/utils";
import * as api from "src/shared/api/user";
const editUserFx = attach({ effect: api.editUserFx });
//stores

export const username = createField({ defaultValue: "" });
export const bio = createField({ defaultValue: "" });

const newCover = createStore(null);
const $userId = $user.map((user) => (user ? user.id : null));
export const $formPending = editUserFx.pending;
//events
export const formMounted = createEvent();
export const formSubmited = createEvent();
sample({
  clock: formMounted,
  source: $user,
  filter: (user: User | null): user is User => typeof user === "object",
  fn: (user) => user.username,
  target: username.$value,
});
sample({
  clock: formMounted,
  source: $user,
  filter: (user: User | null): user is User => typeof user === "object",
  fn: (user) => (user.bio ? user.bio : ""),
  target: bio.$value,
});
type ValidFormValues = {
  username: string;
  bio: string;
  id: number;
};
type InvalidFormValues = {
  username: string;
  bio: string;
  id: null;
};
type Source = ValidFormValues | InvalidFormValues;
sample({
  clock: formSubmited,
  source: { username: username.$value, bio: bio.$value, id: $userId },
  filter: (source: Source): source is ValidFormValues => !!source.id,
  fn: ({ username, bio, id }) => {
    const formdata = new FormData();
    formdata.append("user", JSON.stringify({ username, bio }));
    return { data: formdata, id };
  },
  target: editUserFx,
});

$user.on(editUserFx.done, (_, { result }) => result);
