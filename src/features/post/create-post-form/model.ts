import { attach, createEvent, sample } from "effector";
import { User } from "src/shared/api/auth";
import * as api from "src/shared/api/post";
import { $user } from "src/shared/session";
import { createField } from "src/shared/utils";

const createPostFx = attach({ effect: api.createPostFx });

export const formSubmited = createEvent();

export const contentField = createField({
  defaultValue: "",
  validate: {
    on: formSubmited,
    fn: (value) => {
      if (value.trim().length == 0) {
        return "Post content is empty.";
      }
      return null;
    },
  },
  resetOn: [createPostFx.done],
});
contentField.$error.on(contentField.changed, () => null);
type ValidSource = { user: User; content: string };
type UnvalidSource = { user: null; content: string };
type Source = ValidSource | UnvalidSource;
sample({
  clock: formSubmited,
  // $user type is User | null
  source: { user: $user, content: contentField.$value },
  filter: (source: Source): source is ValidSource =>
    typeof source.user === "object" && contentField.$error === null,
  fn: ({ user, content }) => {
    return { authorId: user.userId, content };
  },
  target: createPostFx,
});
type UserMessage = User;
type WarnMessage = null;
type Message = UserMessage | WarnMessage;

const message = createEvent<Message>();
const userText = createEvent<number>();

sample({
  clock: message,
  // need to explicitly type `msg` as `Message` there
  filter: (msg: Message): msg is UserMessage => {
    if (typeof msg == "object") {
      return true;
    }
    return false;
  },
  // to get correct type inference here
  fn: (msg) => msg.userId,
  target: userText,
});
