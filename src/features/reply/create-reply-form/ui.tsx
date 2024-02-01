import {
  Grid,
  Avatar,
  Group,
  Button,
  TextareaProps,
  Textarea,
} from "@mantine/core";
import { useUnit } from "effector-react";
import { FileInput, ImagesPreview } from "src/shared/ui";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
import {
  $formPending,
  formSubmited,
  replyContentField,
  selectedFiles,
} from "./model";
import { $user } from "src/shared/session";
import { ChangeEventHandler, FormEventHandler } from "react";

export const CreateReplyForm = () => {
  const [user, pending, img, readedFiles] = useUnit([
    $user,
    $formPending,
    selectedFiles.files.$value,
    selectedFiles.$sources,
  ]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (!img) {
        selectedFiles.files.changed(selected);
        return;
      }
      selectedFiles.files.changed(img.concat(selected));
      e.target.files = null;
    }
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmited();
  };
  return (
    <Grid
      className={styles["wrapper"]}
      component="form"
      px={10}
      onSubmit={handleSubmit}
      maw={640}
    >
      <Grid.Col span={2}>
        <Avatar src={getImgUrl(user?.avatar)} />
      </Grid.Col>
      <Grid.Col className={styles["right"]} span={10}>
        <ContentInput disabled={pending} />
        <Group className={styles["footer"]}>
          <FileInput onChange={handleChange} disabled={img?.length === 4} />
          <Button
            type="submit"
            maw={"fit-content"}
            className={styles["postButton"]}
            radius={"30px"}
            loading={pending}
          >
            Post
          </Button>
        </Group>
        <ImagesPreview
          readedFiles={readedFiles}
          close={selectedFiles.closeButtonClicked}
        />
      </Grid.Col>
    </Grid>
  );
};
function ContentInput({ ...props }: TextareaProps) {
  const [value, error] = useUnit([
    replyContentField.$value,
    replyContentField.$error,
  ]);
  return (
    <Textarea
      classNames={{
        input: styles["textarea-input"],
      }}
      className={styles["textarea"]}
      placeholder="Post your reply"
      bg={"dark-blue.9"}
      c="white"
      error={error}
      autosize
      value={value}
      onChange={(e) => replyContentField.changed(e.target.value)}
      minRows={2}
      maxRows={5}
      {...props}
    />
  );
}
