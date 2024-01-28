import { attach, createEvent, createStore, sample } from "effector";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import * as api from "src/shared/api/user";
import * as utils from "src/shared/utils";
import { reset } from "patronum";
const editUserFx = attach({ effect: api.editUserFx });
const readFileFx = attach({ effect: utils.readFileFx });
//stores
export const username = utils.createField({ defaultValue: "" });
export const bio = utils.createField({ defaultValue: "" });
export const cover = utils.getCroppedImage();
export const avatar = utils.getCroppedImage();
const $userId = $user.map((user) => (user ? user.id : null));
export const $formPending = editUserFx.pending;
export const $cropModalOpened = createStore(false);
//events
export const formMounted = createEvent();
export const formSubmited = createEvent();
export const cropModalClosed = createEvent();
//Crop Modal handle
$cropModalOpened.on([avatar.selected, cover.selected], () => true);
$cropModalOpened.on(
  [cover.cropped, avatar.cropped, cropModalClosed],
  () => false,
);
reset({
  clock: cropModalClosed,
  target: [cover.$selectedImage, avatar.$selectedImage],
});
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
  source: {
    username: username.$value,
    bio: bio.$value,
    id: $userId,
  },
  filter: (source: Source): source is ValidFormValues => !!source.id,
  fn: ({ username, bio, id }) => {
    const formdata = new FormData();
    avatar.$croppedImage.map((avatar) => {
      if (cover) formdata.append("avatar", avatar.blob);
    });

    cover.$croppedImage.map((cover) => {
      if (cover) formdata.append("cover", cover.blob);
    });
    formdata.append("user", JSON.stringify({ username, bio }));
    return { data: formdata, id };
  },
  target: editUserFx,
});

$user.on(editUserFx.done, (_, { result }) => result);
