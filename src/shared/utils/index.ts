import {
  createStore,
  createEffect,
  createEvent,
  sample,
  Event,
} from "effector";
import { reset } from "patronum";

export const getImgUrl = (params?: string | null) =>
  `${import.meta.env.VITE_BASE_URL}/${params}`;
export type ReadedFilesType = {
  src: string;
  file: File;
};
export interface CroppedImageType {
  dataUrl: string;
  blob: Blob;
}
const getFileSrc = (file: File): Promise<ReadedFilesType> => {
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
};
export const readFileFx = createEffect<
  File[] | File,
  ReadedFilesType[] | ReadedFilesType,
  Error
>((data) => {
  if (Array.isArray(data)) {
    const readedFiles = data.map(getFileSrc);
    return Promise.all(readedFiles);
  }
  return getFileSrc(data);
});

interface ICreateField<Value, Error> {
  defaultValue: Value;
  validate?: {
    fn: (value: Value) => Error | null;
    on: Event<void>;
  };
  resetOn?: Array<Event<any>>;
}
// Field factory
export function createField<Value, Error>(options: ICreateField<Value, Error>) {
  const $value = createStore(options.defaultValue);
  const $error = createStore<Error | null>(null);
  const changed = createEvent<Value>();
  $value.on(changed, (_, value) => value);
  if (options.validate) {
    sample({
      clock: options.validate.on,
      source: $value,
      fn: options.validate.fn,
      target: $error,
    });
    $error.on(changed, () => null);
  }
  if (options.resetOn) {
    $value.reset(options.resetOn);
    $error.reset(options.resetOn);
  }
  return { $value, $error, changed };
}

//Crop image factory
export const getCroppedImage = () => {
  const $selectedImage = createStore<string | null>(null);
  const $croppedImage = createStore<CroppedImageType | null>(null);
  const newImageSelected = createEvent<File>();
  const newImageCropped = createEvent<CroppedImageType>();
  sample({
    clock: newImageSelected,
    target: readFileFx,
  });
  $selectedImage.on(readFileFx.doneData, (_, data) => {
    if (Array.isArray(data)) return;
    return data.src;
  });
  $croppedImage.on(newImageCropped, (_, data) => data);
  $selectedImage.on(newImageCropped, () => null);
  return {
    $selectedImage,
    $croppedImage,
    selected: newImageSelected,
    cropped: newImageCropped,
  };
};

interface Request {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: URLSearchParams | Record<string, any>;
  body?: { json?: unknown; multipart?: FormData };
}

export const requestFx = createEffect(async (params: Request) => {
  const url = new URL(`/v1/${params.path}`, import.meta.env.VITE_BASE_URL);
  url.search =
    params.query instanceof URLSearchParams
      ? params.query.toString()
      : new URLSearchParams(params.query).toString();
  let body;
  if (params.body?.json) {
    body = JSON.stringify(params.body?.json);
  }
  if (params.body?.multipart) {
    body = params.body.multipart;
  }
  const headers = new Headers();
  if (params.body?.json) {
    headers.set("content-type", "application/json");
  }
  // if (params.body?.multipart) {
  //   headers.set("content-type", "multipart/form-data");
  // }
  const response = await fetch(url, {
    method: params.method,
    body,
    credentials: "include",
    headers,
  });
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  if (response.ok) {
    if (isJson) {
      return response.json();
    }
    return response.text();
  }
  if (isJson) {
    throw await response.json();
  }
  // if (response.status === 401) {
  //   throw { message: 'unauthorized' }
  // }
});
