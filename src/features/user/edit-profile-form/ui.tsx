import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  Stack,
  Textarea,
} from "@mantine/core";
import { useUnit } from "effector-react";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
import { $user } from "src/shared/session";
import {
  bio,
  formMounted,
  $formPending,
  username,
  formSubmited,
} from "src/features/user/edit-profile-form/model";
import { FormEventHandler, useEffect } from "react";
import { FileInput } from "src/shared/ui";

export const EditProfileForm = () => {
  const formIsLoading = useUnit($formPending);
  useEffect(() => {
    formMounted();
  }, []);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmited();
  };
  return (
    <>
      <Stack component="form" onSubmit={handleSubmit}>
        <FormImages />
        <UsernameInput />
        <BioTextarea />
        <Button loading={formIsLoading} bg={"white"} c="black" type="submit">
          Save
        </Button>
      </Stack>
      <Modal opened={true} centered w={600} h={600} onClose={() => {}}>
        Crop
      </Modal>
    </>
  );
};
const FormImages = () => {
  const user = useUnit($user);
  return (
    <Stack>
      <Box className={styles["coverWrapper"]}>
        <Box
          component="img"
          className={styles["cover"]}
          src={getImgUrl(user?.cover)}
        />
        <FileInput
          size="lg"
          variant="transparent"
          className={styles["coverFileInput"]}
        />
      </Box>
      <Box>
        <Avatar
          src={getImgUrl(user?.avatar)}
          size={120}
          mt={-90}
          className={styles["avatar"]}
        />
      </Box>
    </Stack>
  );
};

const UsernameInput = () => {
  const value = useUnit(username.$value);

  return (
    <Input.Wrapper label="Username">
      <Input value={value} onChange={(e) => username.changed(e.target.value)} />
    </Input.Wrapper>
  );
};
const BioTextarea = () => {
  const value = useUnit(bio.$value);

  return (
    <Textarea
      label="Bio"
      value={value}
      onChange={(e) => bio.changed(e.target.value)}
    />
  );
};
