import { Avatar, Box, Grid, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { FC, ReactNode, useRef, useState } from "react";
import { useClickOutside } from "src/shared/hooks/useClickOutside";
import { $user } from "src/shared/session";
import { PopupModal } from "src/shared/ui";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
interface UserProfileButtonProps {
  logout: ReactNode;
}
export const UserProfileButton: FC<UserProfileButtonProps> = ({ logout }) => {
  const user = useUnit($user);
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => setOpen(false));
  return (
    <Box className={styles["wrapper"]}>
      <Box
        component="button"
        className={styles["button"]}
        onClick={() => setOpen(true)}
      >
        <Grid columns={10} align="center" justify="start">
          <Grid.Col span={2} className={styles["avatar"]}>
            <Avatar src={getImgUrl(user?.avatar)} />
          </Grid.Col>
          <Grid.Col span={6} className={styles["info"]}>
            <Text component="p" size="lg" c="white">
              {user?.username}
            </Text>{" "}
            <Text component="span" c="gray">
              @{user?.email.split("@")[0]}
            </Text>
          </Grid.Col>
          <Grid.Col className={styles["icon"]} span={2}>
            <IconDots color="white" />
          </Grid.Col>
        </Grid>
      </Box>
      {open && (
        <PopupModal className={styles["modal"]} onClose={() => setOpen(false)}>
          {logout}
        </PopupModal>
      )}
    </Box>
  );
};
