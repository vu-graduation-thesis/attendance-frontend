import classNames from "classnames/bind";

import imageUrl from "core/assets/images/404.png";

import styles from "./NotFoundPage.module.scss";

const cx = classNames.bind(styles);

export const NotFoundPage = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("imageWrapper")}>
        <img className={cx("image")} src={imageUrl} alt="404" />
      </div>
    </div>
  );
};
