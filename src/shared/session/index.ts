import { attach, createStore } from "effector";
import { debug } from "patronum";
import * as api from "src/shared/api/auth";
import { User } from "src/shared/api/auth";

enum AuthStatus {
  Initial,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionRequestFx = attach({ effect: api.getSessionFx });

export const $user = createStore<User | null>(null);
const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(sessionRequestFx.doneData, (_, user) => user);
$authenticationStatus.on(sessionRequestFx.done, () => AuthStatus.Pending);

$authenticationStatus.on(sessionRequestFx.fail, () => AuthStatus.Anonymous);

debug($user);
