import { Avatar, Box, Group, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { UserFullData } from "src/shared/api/user";
import styles from "./ui.module.css";
type UserInfoType = {
  user: UserFullData | null;
  actionButton: ReactNode;
};
export const UserInfo = ({ user, actionButton }: UserInfoType) => {
  if (!user) return;
  const { avatar, cover, username, email } = user;
  return (
    <Stack className={styles["wrapper"]}>
      {cover ? (
        <Box
          src={import.meta.env.VITE_BASE_URL + `/${cover}`}
          component="img"
          alt="cover"
          className={styles["cover"]}
        />
      ) : (
        <Box className={styles["noCover"]} />
      )}
      <Group w="100%" mt={"-100px"} px={5} justify="space-between">
        <Avatar
          color="light-blue.9"
          size={150}
          src={import.meta.env.VITE_BASE_URL + `/${avatar}`}
        />
        {actionButton}
      </Group>
      <Stack px={15} gap={2}>
        <Title order={3}>{username}</Title>
        <Text size="xs" opacity="70%">
          @{email.split("@")[0]}
        </Text>
      </Stack>
    </Stack>
  );
};
