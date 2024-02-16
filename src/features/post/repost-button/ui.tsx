import { Box } from "@mantine/core";
import { IconPencilPlus, IconRepeat } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { FC, useEffect } from "react";
import { ReactPanelButton } from "src/entities/post";
import { Button, PopupModal, Modal } from "src/shared/ui";
import {
  $repostsInfo,
  buttonMounted,
  repostButtonClicked,
  repostModalStatus,
  repostPopupStatus,
  unrepostButtonClicked,
} from "./model";
import styles from "./ui.module.css";
import { CreatePostForm } from "src/features/post";
import { PostType } from "src/shared/api/post";
interface RepostButtonProps {
  parentPost: PostType;
}
export const RepostButton: FC<RepostButtonProps> = ({ parentPost }) => {
  const [
    repostsInfo,
    modalStatus,
    popupOpened,
    closePopup,
    quoteModalOpened,
    openQuoteModal,
    closeQuoteModal,
  ] = useUnit([
    $repostsInfo,
    repostPopupStatus.$status,
    repostPopupStatus.opened,
    repostPopupStatus.closed,
    repostModalStatus.$status,
    repostModalStatus.opened,
    repostModalStatus.closed,
  ]);
  useEffect(() => {
    if (parentPost) buttonMounted(parentPost.id);
  }, []);
  return (
    <>
      <Box className={styles["wrapper"]}>
        <ReactPanelButton
          icon={<IconRepeat size={18} />}
          action={popupOpened}
          active={repostsInfo?.isReposted ?? false}
          activeColor="green"
          quantity={repostsInfo?.count ?? 0}
        />
        {modalStatus && (
          <PopupModal className={styles["modal"]} onClose={closePopup}>
            {repostsInfo?.isReposted ? (
              <Button
                onClick={() => unrepostButtonClicked()}
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
              onClick={() => openQuoteModal()}
              icon={<IconPencilPlus size={20} />}
            >
              Quote
            </Button>
          </PopupModal>
        )}
      </Box>
      <Modal
        title="Create Repost"
        opened={quoteModalOpened}
        close={closeQuoteModal}
      >
        <CreatePostForm parentPost={parentPost} />
      </Modal>
    </>
  );
};
