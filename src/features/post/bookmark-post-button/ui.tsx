import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { FC, useState } from "react";
import { ReactPanelButton } from "src/entities/post";
import {
  bookmarkBtnClicked,
  unbookmarkBtnClicked,
} from "src/features/post/bookmark-post-button/model";
interface BookmarkButtonProps {
  postId: number;
  bookmarked: boolean;
  count: number;
}
export const BookmarkButton: FC<BookmarkButtonProps> = ({
  postId,
  count,
  bookmarked,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [countState, setCountState] = useState(count);

  const handleLike = () => {
    setIsBookmarked((prev) => !prev);
    if (isBookmarked) {
      setCountState((prev) => prev - 1);
      unbookmarkBtnClicked(postId);
    } else {
      setCountState((prev) => prev + 1);
      bookmarkBtnClicked(postId);
    }
  };

  return (
    <ReactPanelButton
      action={handleLike}
      quantity={countState}
      activeColor="blue"
      active={isBookmarked}
      icon={
        isBookmarked ? (
          <IconBookmarkFilled size={18} />
        ) : (
          <IconBookmark size={18} />
        )
      }
    />
  );
};
