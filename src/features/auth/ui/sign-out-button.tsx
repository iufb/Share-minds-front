import { useUnit } from "effector-react";
import { signOutButtonClicked } from "src/features/auth/models/sign-out";
import { $user } from "src/shared/session";
import { Button } from "src/shared/ui";
export const SignoutButton = () => {
  const user = useUnit($user);
  return (
    <Button onClick={() => signOutButtonClicked()}>
      Log out @{user?.email.split("@")[0]}
    </Button>
  );
};
