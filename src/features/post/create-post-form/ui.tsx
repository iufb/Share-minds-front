import { Avatar, Button, Group, Stack, Textarea } from "@mantine/core";
import styles from "./ui.module.css";
import { useUnit } from "effector-react";
import { contentField, formSubmited } from "./model";
import { FormEventHandler } from "react";
export const CreatePostForm = () => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formSubmited();
  };
  return (
    <Stack component="form" align="end" px={10} onSubmit={handleSubmit}>
      <Group w={"100%"} align="start">
        <Avatar />
        <ContentInput />
      </Group>
      <Button type="submit" maw={"fit-content"} radius={"30px"}>
        Post
      </Button>
    </Stack>
  );
};

function ContentInput() {
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
    />
  );
}
