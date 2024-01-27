import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from "atomic-router";
import { Effect, attach, createEvent, createStore, sample } from "effector";
import * as api from "src/shared/api/auth";
import { User } from "src/shared/api/user";

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
$user.watch((u) => console.log(u));
$authenticationStatus.on(sessionRequestFx.done, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionRequestFx.fail, () => AuthStatus.Anonymous);

interface ChainParams {
  otherwise?: Effect<void, RouteParamsAndQuery<RouteParams>, any>;
}
export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams,
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();
  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });
  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });
  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });
  sample({
    clock: [alreadyAnonymous, sessionRequestFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });
  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise,
    });
  }
  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionRequestFx.done],
    cancelOn: sessionReceivedAnonymous,
  });
}
export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated =
    createEvent<RouteParamsAndQuery<Params>>();
  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });
  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });
  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });
  sample({
    clock: [alreadyAuthenticated, sessionRequestFx.done],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  });
  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise,
    });
  }
  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionRequestFx.fail],
    cancelOn: sessionReceivedAuthenticated,
  });
}
