import { attach, createEvent, createStore, sample } from "effector";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import * as api from "src/shared/api/user";
import * as utils from "src/shared/utils";
import { reset } from "patronum";
const editUserFx = attach({ effect: api.editUserFx });
//stores
export const username = utils.createField({ defaultValue: "" });
export const bio = utils.createField({ defaultValue: "" });
export const cover = utils.getCroppedImage();
export const avatar = utils.getCroppedImage();
const $userId = $user.map((user) => (user ? user.id : null));
export const $formPending = editUserFx.pending;
export const $cropModalOpened = createStore(false);
export const $imageSelectedFor = createStore<"avatar" | "cover">("cover");
$imageSelectedFor.on(avatar.selected, () => "avatar");
$imageSelectedFor.on(cover.selected, () => "cover");
export const $submitButtonDisabled = createStore(true);
$submitButtonDisabled.on(
  [avatar.cropped, cover.cropped, username.changed, bio.changed],
  () => false,
);
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
    avatar.$croppedImage.map(
      (avatar) => {
        if (avatar) formdata.append("avatar", avatar.blob);
      },
      { skipVoid: false },
    );

    cover.$croppedImage.map(
      (cover) => {
        if (cover) formdata.append("cover", cover.blob);
      },
      { skipVoid: false },
    );
    formdata.append("user", JSON.stringify({ username, bio }));
    return { data: formdata, id };
  },
  target: editUserFx,
});

$user.on(editUserFx.done, (_, { result }) => result);
//cases:
//1)
//1.Modal opened.
//2.Modal closed.
//2)
//1.Modal opened.
//2.Cover selected.
//3.Crop modal closed.
//3)
//1.Modal opened.
//2.Cover selected.
//3.Image cropped.
