import { attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/auth";
import { createField } from "src/shared/utils";
const signInFx = attach({ effect: api.signInFx });

//Events
export const formSubmitted = createEvent();

//Stores

export const emailField = createField({
  defaultValue: "",
  resetOn: [signInFx.done],
});
export const passwordField = createField({
  defaultValue: "",
  resetOn: [signInFx.done],
  validate: {
    on: formSubmitted,
    fn: (pass) => {
      if (pass.length < 6) {
        return "Length need more than 6";
      }
    },
  },
});
export const $error = createStore<api.SignInError | null>(null);
export const $pending = createStore(false);

// handle event changes
$error.on(signInFx.failData, (_, error) => error);
$error.on([emailField.changed, passwordField.changed], () => null);

// Form submit
sample({
  clock: formSubmitted,
  source: { email: emailField.$value, password: passwordField.$value },
  target: signInFx,
});
