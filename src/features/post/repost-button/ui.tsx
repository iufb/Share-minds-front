import { Box } from "@mantine/core";
import { IconPencilPlus, IconRepeat } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { FC, useEffect, useState } from "react";
import { ReactPanelButton } from "src/entities/post";
import { CreatePostForm } from "src/features/post";
import { Post } from "src/shared/api/post";
import { Button, Modal, PopupModal } from "src/shared/ui";
import {
  $repostsInfo,
  buttonMounted,
  repostButtonClicked,
  repostModalStatus,
  unrepostButtonClicked,
} from "./model";
import styles from "./ui.module.css";
interface RepostButtonProps {
  parentPost: Post;
}
export const RepostButton: FC<RepostButtonProps> = ({ parentPost }) => {
  const [popupModalStatus, setPopupStatus] = useState(false);
  const popupOpened = () => setPopupStatus(true);
  const closePopup = () => setPopupStatus(false);
  const [repostsInfo, quoteModalStatus] = useUnit([
    $repostsInfo,
    repostModalStatus.$status,
  ]);

  const currentPostInfo = repostsInfo
    ? repostsInfo[parentPost.id]
    : { isReposted: false, count: 0 };

  useEffect(() => {
    if (parentPost) buttonMounted(parentPost.id);
    console.log(parentPost.id, "REPOST >> ID>>");
  }, []);

  return (
    <>
      <Box className={styles["wrapper"]}>
        <ReactPanelButton
          icon={<IconRepeat size={18} />}
          action={popupOpened}
          active={currentPostInfo ? currentPostInfo.isReposted : false}
          activeColor="green"
          quantity={currentPostInfo ? currentPostInfo.count : 0}
        />
        {popupModalStatus && (
          <PopupModal className={styles["modal"]} onClose={closePopup}>
            {currentPostInfo.isReposted ? (
              <Button
                onClick={() => unrepostButtonClicked(parentPost.id)}
                icon={<IconRepeat size={20} />}
              >
                Unrepost
              </Button>
            ) : (
              <Button
                onClick={() => repostButtonClicked(parentPost.id)}
                icon={<IconRepeat size={20} />}
              >
                Repost
              </Button>
            )}
            <Button
              onClick={() =>
                repostModalStatus.change({ id: parentPost.id, value: true })
              }
              icon={<IconPencilPlus size={20} />}
            >
              Quote
            </Button>
          </PopupModal>
        )}
      </Box>
      <Modal
        title="Create Repost"
        opened={quoteModalStatus[parentPost.id]}
        close={() => {
          repostModalStatus.change({ id: parentPost.id, value: false });
          closePopup();
        }}
      >
        <CreatePostForm parentPost={parentPost} />
      </Modal>
    </>
  );
};
