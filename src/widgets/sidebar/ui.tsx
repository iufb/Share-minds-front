import { Stack, Text } from "@mantine/core";
import {
  IconBookmark,
  IconHome,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "atomic-router-react";
import { routes } from "src/shared/routing";
import styles from "./ui.module.css";
import clsx from "clsx";
import { useUnit } from "effector-react";
import { $user } from "src/shared/session";
import { RouteInstance, RouteParams } from "atomic-router";
import { FC } from "react";
import { CreatePostButton } from "src/entities/post/create-post-button/ui";
import { CreatePostForm } from "src/features/post";
import { UserProfileButton } from "src/entities/user";
import { SignoutButton } from "src/features/auth";
const navlinks = [
  {
    leftSection: (active: boolean) => (
      <IconHome className={clsx(active && styles["active"])} />
    ),
    path: routes.home,
    name: "Home",
  },
  {
    leftSection: (active: boolean) => (
      <IconSearch className={clsx(active && styles["active"])} />
    ),

    path: routes.explore,
    name: "Explore",
  },
  {
    leftSection: (active: boolean) => (
      <IconBookmark className={clsx(active && styles["active"])} />
    ),
    path: routes.bookmarks,
    name: "Bookmarks",
  },

  {
    leftSection: () => <IconUser />,
    path: routes.profile,
    name: "Profile",
  },
];
export const Sidebar = () => {
  return (
    <Stack className={styles["container"]} justify="space-between">
      <Stack>
        <Stack component="nav" className={styles["navContainer"]}>
          {navlinks.map(({ leftSection, path, name }) => (
            <Navlink
              key={name}
              leftSection={leftSection}
              path={path as unknown as RouteInstance<RouteParams>}
              name={name}
            />
          ))}
        </Stack>
        <CreatePostButton createPostForm={<CreatePostForm />} />
      </Stack>
      <UserProfileButton logout={<SignoutButton />} />
    </Stack>
  );
};
interface NavlinkProps {
  leftSection: (active: boolean) => JSX.Element;
  path: RouteInstance<RouteParams>;
  name: string;
}
const Navlink: FC<NavlinkProps> = ({ leftSection, path, name }) => {
  const [isOpened, user] = useUnit([path.$isOpened, $user]);
  return (
    <Link
      to={path as RouteInstance<RouteParams>}
      activeClassName={!(name == "Profile") ? styles["active"] : ""}
      className={styles["navlink"]}
      params={
        name == "Profile"
          ? {
              id: user?.id,
            }
          : undefined
      }
      key={name}
    >
      {leftSection(isOpened)}
      <Text component="span">{name}</Text>
    </Link>
  );
};
