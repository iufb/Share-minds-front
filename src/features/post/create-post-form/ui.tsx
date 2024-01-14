import {
  Avatar,
  Button,
  Grid,
  Group,
  Stack,
  Textarea,
  TextareaProps,
} from "@mantine/core";
import styles from "./ui.module.css";
import { useUnit } from "effector-react";
import {
  $formPending,
  $selectedFiles,
  $selectedFilesSrc,
  closeButtonClicked,
  contentField,
  formSubmited,
} from "./model";
import { ChangeEventHandler, FormEventHandler } from "react";
import { FileInput, ImagePreview } from "src/shared/ui";
export const CreatePostForm = () => {
  const [pending, img, readedFiles] = useUnit([
    $formPending,
    $selectedFiles.$value,
    $selectedFilesSrc,
  ]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmited();
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (!img) {
        $selectedFiles.changed(selected);
        return;
      }
      $selectedFiles.changed(img.concat(selected));
      e.target.files = null;
    }
  };
  return (
    <Grid component="form" px={10} onSubmit={handleSubmit} maw={640}>
      <Grid.Col span={1}>
        <Avatar />
      </Grid.Col>
      <Grid.Col className={styles["right"]} span={11}>
        <ContentInput disabled={pending} />
        <FileInput onChange={handleChange} disabled={img?.length === 4} />

        <Group>
          {readedFiles &&
            readedFiles.map((file) => {
              return (
                <ImagePreview
                  key={file.src}
                  close={() => {
                    closeButtonClicked(file);
                  }}
                  src={file.src}
                  mah={readedFiles.length > 1 ? "300px" : "100%"}
                  maw={readedFiles.length > 1 ? "46%" : "100%"}
                />
              );
            })}
        </Group>
        <Button
          type="submit"
          maw={"fit-content"}
          className={styles["postButton"]}
          radius={"30px"}
          loading={pending}
        >
          Post
        </Button>
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
