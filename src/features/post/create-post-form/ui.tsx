import {
  Avatar,
  Button,
  Grid,
  Group,
  Textarea,
  TextareaProps,
} from "@mantine/core";
import styles from "./ui.module.css";
import { useUnit } from "effector-react";
import {
  $formPending,
  contentField,
  formSubmited,
  selectedFiles,
} from "./model";
import { ChangeEventHandler, FC, FormEventHandler } from "react";
import { FileInput, ImagesPreview } from "src/shared/ui";
import { $user } from "src/shared/session";
import { getImgUrl } from "src/shared/utils";
import { PostType } from "src/shared/api/post";
interface CreatePostFormProps {
  parentPost?: PostType;
}
export const CreatePostForm: FC<CreatePostFormProps> = ({ parentPost }) => {
  const [user, pending, img, readedFiles] = useUnit([
    $user,
    $formPending,
    selectedFiles.files.$value,
    selectedFiles.$sources,
  ]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmited({ isRepost: !!parentPost });
  };
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
          <FileInput
            variant="base"
            onChange={handleChange}
            disabled={img?.length === 4}
          />
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
  const [value, error] = useUnit([contentField.$value, contentField.$error]);
  return (
    <Textarea
      classNames={{
        root: styles["textarea-root"],
        input: styles["textarea-input"],
      }}
      className={styles["textarea"]}
      placeholder="What happening?!"
      bg={"dark-blue.9"}
      c="white"
      error={error}
      autosize
      value={value}
      onChange={(e) => contentField.changed(e.target.value)}
      minRows={2}
      maxRows={5}
      {...props}
    />
  );
}
