import {
  BackgroundImage,
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
  cover,
  $cropModalOpened,
  avatar,
  cropModalClosed,
  $imageSelectedFor,
  $submitButtonDisabled,
} from "src/features/user/edit-profile-form/model";
import { ChangeEventHandler, FormEventHandler, useEffect } from "react";
import { FileInput, ImageCrop } from "src/shared/ui";
export const EditProfileForm = () => {
  const [
    formIsLoading,
    newCover,
    newAvatar,
    imageSelectedFor,
    cropModalOpened,
    submitButtonDisabled,
  ] = useUnit([
    $formPending,
    cover.$selectedImage,
    avatar.$selectedImage,
    $imageSelectedFor,
    $cropModalOpened,
    $submitButtonDisabled,
  ]);
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
        <Button
          loading={formIsLoading}
          disabled={submitButtonDisabled}
          bg={"white"}
          c="black"
          type="submit"
        >
          Save
        </Button>
      </Stack>
      <Modal
        opened={cropModalOpened}
        centered
        size={616}
        title="Crop image"
        onClose={cropModalClosed}
      >
        {/*TODO!!*/}
        <ImageCrop
          srcImage={imageSelectedFor === "cover" ? newCover : newAvatar}
          cropWidth={imageSelectedFor === "cover" ? 550 : 499}
          cropHeight={imageSelectedFor === "cover" ? 183 : 499}
          imageCropped={
            imageSelectedFor === "cover" ? cover.cropped : avatar.cropped
          }
        />
      </Modal>
    </>
  );
};
const FormImages = () => {
  const [user, newCroppedCover, newCroppedAvatar] = useUnit([
    $user,
    cover.$croppedImage,
    avatar.$croppedImage,
  ]);
  const changeCover: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const newCover = Array.from(e.target.files)[0];
      cover.selected(newCover);
    }
  };
  const changeAvatar: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const newAvatar = Array.from(e.target.files)[0];
      avatar.selected(newAvatar);
    }
  };

  return (
    <Stack>
      <Box className={styles["coverWrapper"]}>
        <Box
          component="img"
          className={styles["cover"]}
          src={
            newCroppedCover ? newCroppedCover.dataUrl : getImgUrl(user?.cover)
          }
        />
        <FileInput
          onChange={changeCover}
          size="lg"
          variant="transparent"
          className={styles["fileInput"]}
        />
      </Box>
      <BackgroundImage
        src={
          newCroppedAvatar ? newCroppedAvatar.dataUrl : getImgUrl(user?.avatar)
        }
        w={120}
        h={120}
        mt={-90}
        className={styles.avatar}
      >
        <FileInput
          onChange={changeAvatar}
          size="md"
          variant="transparent"
          className={styles["fileInput"]}
        />
      </BackgroundImage>
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
