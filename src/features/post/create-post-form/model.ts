import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { and, every, not } from "patronum";
import { User } from "src/shared/api/auth";
import * as api from "src/shared/api/post";
import { $user } from "src/shared/session";
import { createField } from "src/shared/utils";

export const createPostFx = attach({ effect: api.createPostFx });
export const formSubmited = createEvent();
export const closeButtonClicked = createEvent<ReadedFilesType>();

// $selectedFiles.$value.on(closeButtonClicked, (list, src) => list?.filter((file)=> )
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

type ReadedFilesType = {
  src: string;
  file: File;
};
const readFileFx = createEffect<File[], ReadedFilesType[], Error>(
  (files: File[]) => {
    const readedFiles: Promise<ReadedFilesType>[] = files.map((file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result == "string") resolve({ src: result, file });
        };
        reader.onerror = (e) => {
          reject(e.target?.error);
        };
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(readedFiles);
  },
);

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
    source: { user: $user, content: contentField.$value },
    filter: (source: Source): source is ValidSource =>
      typeof source.user === "object",
  }),
  filter: and($formValid, not($formPending)),
  fn: ({ user, content }) => ({ authorId: user.userId, content }),
  target: createPostFx,
});
