import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { FC, useState } from "react";
import { ReactPanelButton } from "src/entities/post";
import {
  likePostClicked,
  unLikePostClicked,
} from "src/features/post/like-post-button/model";
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
    <ReactPanelButton
      action={handleLike}
      quantity={likesCountState}
      activeColor="red"
      active={isLikedState}
      icon={
        isLikedState ? <IconHeartFilled size={18} /> : <IconHeart size={18} />
      }
    />
  );
};
