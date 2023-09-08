import classNames from "classnames/bind";

import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";

import FrameIcon from "core/assets/images/frame.png";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);
export const CollectFacePage = () => {
  return (
    <div className={cx("container")}>
      <h3 className={cx("title")} onClick={() => {
        CameraPreview.
      }}>Hệ thống điểm danh sinh viên</h3>
      <button
        onClick={() => {
          const cameraPreviewOptions: CameraPreviewOptions = {
            position: "rear",
            height: 400,
            width: 300,
            parent: "cameraPreview",
          };
          CameraPreview.start(cameraPreviewOptions);
        }}
      >
        Start
      </button>
      <div id="cameraPreview" className={cx("cameraPreview")}>
        <div className={cx("guide")}>
          <span className={cx("text")}>Đưa khuôn mặt vào khung</span>
          <img src={FrameIcon} alt="" className={cx("frame")} />
        </div>
      </div>
    </div>
  );
};
