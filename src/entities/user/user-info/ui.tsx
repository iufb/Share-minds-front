import {
  Avatar,
  Box,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ReactNode } from "react";
import { User } from "src/shared/api/user";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
type UserInfoType = {
  profile: User | null;
  actionButton: ReactNode;
};
export const UserInfo = ({ profile, actionButton }: UserInfoType) => {
  if (profile === null)
    return (
      <Stack className={styles["wrapper"]}>
        <Skeleton />
        <Group w="100%" mt={"-100px"} px={5} justify="space-between">
          <Skeleton circle height={150} />
        </Group>
        <Stack px={15} gap={2}>
          <Skeleton />
          <Skeleton />
        </Stack>
        <Skeleton />
      </Stack>
    );
  const { avatar, cover, username, email, bio } = profile;
  return (
    <Stack className={styles["wrapper"]}>
      {cover ? (
        <Box
          src={getImgUrl(cover)}
          component="img"
          alt="cover"
          className={styles["cover"]}
        />
      ) : (
        <Box className={styles["noCover"]} />
      )}
      <Group w="100%" mt={"-100px"} px={5} justify="space-between">
        <Avatar color="light-blue.9" size={150} src={getImgUrl(avatar)} />
        {actionButton}
      </Group>
      <Stack px={15} gap={2}>
        <Title order={3}>{username}</Title>
        <Text size="xs" opacity="70%">
          @{email.split("@")[0]}
        </Text>
      </Stack>
      <Text ml={5} size="sm">
        {bio}
      </Text>
    </Stack>
  );
};
