import { useUnit } from "effector-react";
import { EditProfileButton, UserInfo } from "src/entities/user";
import { EditProfileForm } from "src/features/user";
import { $isCurrentUser, $profile } from "src/pages/profile/model";
import { BaseLayout } from "src/shared/ui";
import { UserContent } from "src/widgets/profile/user-content";
import { Sidebar } from "src/widgets/sidebar";
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
  const [isCurrentUser, profile] = useUnit([$isCurrentUser, $profile]);
  return (
    <>
      <UserInfo
        profile={profile}
        actionButton={
          isCurrentUser ? (
            <EditProfileButton editForm={<EditProfileForm />} />
          ) : (
            <div>Follow</div>
          )
        }
      />
      <UserContent />
    </>
  );
}
