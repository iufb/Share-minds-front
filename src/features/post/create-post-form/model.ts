import { attach, createEvent, createStore, sample } from "effector";
import { and, every, not, reset } from "patronum";
import * as api from "src/shared/api/post";
import * as utils from "src/shared/utils";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import { createField } from "src/shared/utils";
//effects
export const createPostFx = attach({ effect: api.createPostFx });
//events
export const formSubmited = createEvent<{
  isRepost: boolean;
  sourceId: number | null;
}>();
//stores
export const $isRepost = createStore(false);
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
export const $formPending = createPostFx.pending;
sample({
  clock: formSubmited,
  filter: ({ isRepost }) => isRepost,
  fn: () => true,
  target: $isRepost,
});
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
  fn: ({ user, content }, { isRepost, sourceId }) => {
    const formdata = new FormData();
    formdata.append(
      "post",
      JSON.stringify({
        authorId: user.id,
        content,
        isRepost: isRepost,
        isReply: false,
        sourceId: sourceId ? sourceId : null,
      }),
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
