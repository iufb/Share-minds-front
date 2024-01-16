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
    leftSection: (active: boolean) => (
      <IconUser className={clsx(active && styles["active"])} />
    ),
    path: routes.profile,
    name: "Profile",
  },
];
export const Sidebar = () => {
  return (
    <Stack className={styles["container"]}>
      <Stack component="nav" className={styles["navContainer"]}>
        {navlinks.map(({ leftSection, path, name }) => (
          <Navlink leftSection={leftSection} path={path} name={name} />
        ))}
      </Stack>
    </Stack>
  );
};
const Navlink = ({ leftSection, path, name }: (typeof navlinks)[0]) => {
  const isOpened = useUnit(path.$isOpened);
  return (
    <Link to={path} className={styles["navlink"]} key={name}>
      {leftSection(isOpened)}
      <Text
        component="span"
        className={clsx(isOpened ? styles["active"] : null)}
      >
        {name}
      </Text>
    </Link>
  );
};
