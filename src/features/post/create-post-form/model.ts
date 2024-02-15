import { attach, createEvent, sample } from "effector";
import { and, every, not, reset } from "patronum";
import * as api from "src/shared/api/post";
import * as utils from "src/shared/utils";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import { createField } from "src/shared/utils";
//effects
export const createPostFx = attach({ effect: api.createPostFx });
//events
export const formSubmited = createEvent<{ isRepost: boolean }>();
//stores
export const contentField = createField({
  defaultValue: "",
  validate: {
    on: formSubmited,
    fn: (value) => {
      if (value.trim().length == 0) {
        return "Post content is empty";
      }
      return null;
    },
  },
  resetOn: [createPostFx.done],
});
const $formValid = every({
  stores: [contentField.$error],
  predicate: (status) => status === null,
});
export const selectedFiles = utils.getImagePreview();
selectedFiles.$sources.watch((f) => console.log(f, "PostModel"));
export const $formPending = createPostFx.pending;

type ValidSource = { user: User; content: string };
type UnvalidSource = {
  user: null;
  content: string;
};
type Source = ValidSource | UnvalidSource;
sample({
  clock: formSubmited,
  // $user type is User | null
  source: sample({
    source: {
      user: $user,
      content: contentField.$value,
    },
    filter: (source: Source): source is ValidSource =>
      typeof source.user === "object",
  }),
  filter: and($formValid, not($formPending)),
  fn: ({ user, content }, { isRepost }) => {
    const formdata = new FormData();
    formdata.append(
      "post",
      JSON.stringify({ authorId: user.id, content, isRepost }),
    );
    selectedFiles.files.$value.map(
      (files) => {
        if (!files) return files;
        files.map((file) => formdata.append("files", file));
      },
      { skipVoid: false },
    );
    return formdata;
  },
  target: createPostFx,
});
reset({
  clock: [createPostFx.done],
  target: [selectedFiles.files.$value, selectedFiles.$sources],
});
