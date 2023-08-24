import classNames from "classnames/bind";

import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);
export const CollectFacePage = () => {
  return (
    <div className={cx("container")}>
      <h3 className={cx("title")}>Hệ thống điểm danh sinh viên</h3>
      <button
        onClick={() => {
          const cameraPreviewOptions: CameraPreviewOptions = {
            position: "rear",
            height: 450,
            width: 300,
            parent: "cameraPreview",
          };
          CameraPreview.start(cameraPreviewOptions);
        }}
      >
        Start
      </button>
      <div id="cameraPreview" className={cx("cameraPreview")}></div>
    </div>
  );
};
