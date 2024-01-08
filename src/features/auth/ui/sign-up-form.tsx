import {
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Notification,
} from "@mantine/core";
import { useUnit } from "effector-react";
import { FormEventHandler } from "react";
import {
  emailField,
  $error,
  passwordField,
  $pending,
  formSubmitted,
  usernameField,
} from "src/features/auth/models/sign-up";

function Email() {
  const [email, pending] = useUnit([emailField.$value, $pending]);
  return (
    <TextInput
      c={"white"}
      label="Email"
      type="email"
      required
      placeholder="Enter your email to sign in"
      onChange={(e) => emailField.changed(e.target.value)}
      value={email}
      disabled={pending}
    />
  );
}
function Password() {
  const [password, error, pending] = useUnit([
    passwordField.$value,
    passwordField.$error,
    $pending,
  ]);
  return (
    <PasswordInput
      c={"white"}
      required
      type="password"
      placeholder="Enter your password"
      label="Password"
      error={error}
      onChange={(e) => passwordField.changed(e.target.value)}
      value={password}
      disabled={pending}
    />
  );
}
function Username() {
  const [username, error, pending] = useUnit([
    usernameField.$value,
    usernameField.$error,
    $pending,
  ]);
  return (
    <TextInput
      c={"white"}
      label="Username"
      type="text"
      required
      error={error}
      placeholder="Enter your username"
      onChange={(e) => usernameField.changed(e.target.value)}
      value={username}
      disabled={pending}
    />
  );
}
function ErrorView() {
  const error = useUnit($error);
  if (error?.error) {
    return (
      <Notification
        pos="absolute"
        bottom={20}
        withCloseButton={false}
        color="red"
        title={error.statusCode}
      >
        {" "}
        {error.message}
      </Notification>
    );
  }
}

export const SignUpForm = () => {
  const pending = useUnit($pending);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmitted();
  };
  return (
    <Stack component={"form"} maw={"400px"} onSubmit={handleSubmit}>
      <Email />
      <Username />
      <Password />
      <ErrorView />
      <Button type="submit" loading={pending}>
        Sign up
      </Button>
    </Stack>
  );
};
