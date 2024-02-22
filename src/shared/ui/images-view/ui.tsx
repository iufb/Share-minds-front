import clsx from "clsx";
import { getImgUrl } from "src/shared/utils";
import styles from "./ui.module.css";
export const ImagesView = ({ images }: { images: string[] }) => {
  if (images.length == 0) return;
  return (
    <div
      className={clsx(styles["imagesContainer"], {
        [styles["one"]]: images.length == 1,
        [styles["two"]]: images.length == 2,
        [styles["three"]]: images.length == 3,
      })}
    >
      {images.map((image) => (
        <img key={image} src={getImgUrl(image)} className={styles["image"]} />
      ))}
    </div>
  );
};
