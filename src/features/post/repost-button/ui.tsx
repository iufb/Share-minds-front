import { Box } from "@mantine/core";
import { IconPencilPlus, IconRepeat } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { FC, useEffect } from "react";
import { ReactPanelButton } from "src/entities/post";
import { Button, Modal } from "src/shared/ui";
import {
  $repostsInfo,
  buttonMounted,
  quoteButtonClicked,
  repostButtonClicked,
  repostModalStatus,
  unrepostButtonClicked,
} from "./model";
import styles from "./ui.module.css";
interface RepostButtonProps {
  sourceId: number;
}
export const RepostButton: FC<RepostButtonProps> = ({ sourceId }) => {
  const [repostsInfo, modalStatus, open, close] = useUnit([
    $repostsInfo,
    repostModalStatus.$status,
    repostModalStatus.opened,
    repostModalStatus.closed,
  ]);
  useEffect(() => {
    if (sourceId) buttonMounted(sourceId);
  }, []);
  return (
    <Box className={styles["wrapper"]}>
      <ReactPanelButton
        icon={<IconRepeat size={18} />}
        action={open}
        active={repostsInfo?.isReposted ?? false}
        activeColor="green"
        quantity={repostsInfo?.count ?? 0}
      />
      {modalStatus && (
        <Modal className={styles["modal"]} onClose={close}>
          {repostsInfo?.isReposted ? (
            <Button
              onClick={() => unrepostButtonClicked()}
              icon={<IconRepeat size={20} />}
            >
              Unrepost
            </Button>
          ) : (
            <Button
              onClick={() => repostButtonClicked(sourceId)}
              icon={<IconRepeat size={20} />}
            >
              Repost
            </Button>
          )}
          <Button
            onClick={() => quoteButtonClicked()}
            icon={<IconPencilPlus size={20} />}
          >
            Quote
          </Button>
        </Modal>
      )}
    </Box>
  );
};