import { useUnit } from "effector-react";
import { UserInfo } from "src/entities/user";
import { $userInfo } from "src/pages/profile/model";
import { BaseLayout } from "src/shared/ui";
import { Sidebar } from "src/widgets/sidebar";
import { UserContent } from "src/widgets/profile/user-content";
export const ProfilePage = () => {
  return (
    <BaseLayout
      sidebar={<Sidebar />}
      header={<div>Header</div>}
      main={<ProfileContent />}
    />
  );
};
function ProfileContent() {
  const user = useUnit($userInfo);
  return (
    <>
      <UserInfo user={user} actionButton={<div>Follow</div>} />
      <UserContent />
    </>
  );
}
