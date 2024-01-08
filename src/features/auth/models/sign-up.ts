import { attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/auth";
import { createField } from "src/shared/utils";
const signUpFx = attach({ effect: api.signUpFx });

//Events
export const formSubmitted = createEvent();
//Stores

export const emailField = createField({
  defaultValue: "",
  resetOn: [signUpFx.done],
});
export const usernameField = createField({
  defaultValue: "",
  resetOn: [signUpFx.done],
  validate: {
    on: formSubmitted,
    fn: (name) => {
      if (name.length < 3) {
        return "Length need more than 3";
      }
    },
  },
});

export const passwordField = createField({
  defaultValue: "",
  resetOn: [signUpFx.done],
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
$error.on(signUpFx.failData, (_, error) => error);
$error.on(
  [emailField.changed, usernameField.changed, passwordField.changed],
  () => null,
);

// Form submit
sample({
  clock: formSubmitted,
  source: {
    email: emailField.$value,
    username: usernameField.$value,
    password: passwordField.$value,
  },
  target: signUpFx,
});
