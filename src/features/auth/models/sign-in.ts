import { attach, createEffect, createEvent, createStore, sample } from "effector";
import * as api from 'src/shared/api/auth'
import { SigninResponse } from "src/shared/api/auth/auth";
const signInFx = attach({ effect: api.signInFx })


//Events
export const emailChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const formSubmitted = createEvent()

//Stores
export const $email = createStore('')
export const $password = createStore('')

// Form submit 
sample({
  clock: formSubmitted,
  source: { email: $email, password: $password },
  target: signInFx
})
// handle event changes
$email.on(emailChanged, (_, email) => email)
$password.on(passwordChanged, (_, password) => password)
