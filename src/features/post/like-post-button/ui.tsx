import { Group, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { FC, useState } from "react";
import {
  likePostClicked,
  unLikePostClicked,
} from "src/features/post/like-post-button/model";
import { IconButton } from "src/shared/ui";
interface LikePostButtonProps {
  isLiked: boolean;
  postId: number;
  likesCount: number;
}
export const LikePostButton: FC<LikePostButtonProps> = ({
  isLiked,
  likesCount,
  postId,
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  console.log(isLiked, likesCount);

  const handleLike = () => {
    setIsLikedState((prev) => !prev);
    if (isLikedState) {
      setLikesCountState((prev) => prev - 1);
      unLikePostClicked(postId);
    } else {
      setLikesCountState((prev) => prev + 1);
      likePostClicked({ sourceId: postId });
    }
  };
  return (
    <Group gap={5}>
      <IconButton
        onClick={handleLike}
        variant="like"
        icon={
          isLikedState ? <IconHeartFilled size={18} /> : <IconHeart size={18} />
        }
      />
      <Text component="span" size="sm" c="gray">
        {likesCountState}
      </Text>
    </Group>
  );
};
