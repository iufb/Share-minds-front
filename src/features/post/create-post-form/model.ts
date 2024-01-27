import { attach, createEvent, createStore, sample } from "effector";
import { and, every, not, reset } from "patronum";
import * as api from "src/shared/api/post";
import * as utils from "src/shared/utils";
import { User } from "src/shared/api/user";
import { $user } from "src/shared/session";
import { createField } from "src/shared/utils";

export const createPostFx = attach({ effect: api.createPostFx });
const readFileFx = attach({ effect: utils.readFileFx });
export const formSubmited = createEvent();
export const closeButtonClicked = createEvent<utils.ReadedFilesType>();

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
export const $selectedFiles = createField<File[] | null, Error>({
  defaultValue: null,
});
const $formValid = every({
  stores: [contentField.$error],
  predicate: (status) => status === null,
});
export const $formPending = createPostFx.pending;

export const $selectedFilesSrc = createStore<ReadedFilesType[] | null>(null);
$selectedFiles.$value.on(closeButtonClicked, (list, file) => {
  if (!list) return null;
  const filtered = list.filter((f) => f.name !== file.file.name);
  return filtered;
});
$selectedFilesSrc.on(closeButtonClicked, (list, src) => {
  if (!list) return null;
  const filtered = list.filter((f) => f !== src);
  return filtered;
});

sample({
  clock: $selectedFiles.changed,
  source: $selectedFiles.$value,
  filter: (files: File[] | null): files is File[] => files !== null,
  target: readFileFx,
});

$selectedFilesSrc.on(readFileFx.doneData, (_, readedFiles) => readedFiles);
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
  fn: ({ user, content }) => {
    const formdata = new FormData();
    formdata.append("post", JSON.stringify({ authorId: user.id, content }));
    $selectedFiles.$value.map((files) => {
      if (!files) return files;
      files.map((file) => formdata.append("files", file));
    });
    return formdata;
  },
  target: createPostFx,
});
reset({
  clock: [createPostFx.done],
  target: [$selectedFiles.$value, $selectedFilesSrc],
});
