import { Spin, Typography } from "antd";
import classNames from "classnames/bind";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";

import { CameraPreview } from "@capacitor-community/camera-preview";

import { useDetectFace } from "core/mutations/faceRecognition.ts";

import styles from "./style.module.scss";

const { Text } = Typography;

const cx = classNames.bind(styles);
const threshold = 0.6;
export const AttendancePage = () => {
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [faces, setFaces] = useState<any>([]);
  const { mutateAsync: detectFaces } = useDetectFace();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captureType, setCaptureType] = useState<"image" | "video">("image");
  const handlCapture = async () => {
    const capture = await CameraPreview.capture({
      quality: 100,
    });

    const result = await detectFaces(`data:image/jpeg;base64,${capture.value}`);
  };

  useEffect(() => {
    (async () => {
      // document.body.style.backgroundColor = "transparent !important";
      await CameraPreview.start({
        parent: "camera",
        position: "rear",
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: Math.floor(window.innerHeight * 0.75),
        enableZoom: true,
        toBack: true,
      });
    })();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("fix-top")}>
        <div id="camera"></div>
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
      <div className={cx("top")}>{isLoadingModels && <Spin />}</div>-
      <div className={cx("bottom")}>
        <div className={cx("image-recents")}></div>
        <div className={cx("flex", "justify-center", "text-white", "option")}>
          <Text className="text-yellow m-5">Ảnh</Text>
          <Text className="text-white m-5">Video</Text>
        </div>
        <div className={cx("takePhoto")} onClick={handlCapture}>
          <div className={cx("takePhoto2")}>
            <div className={cx("takePhoto3")}></div>
          </div>
        </div>
        <div className={cx("image-recents", "visibile")}></div>
      </div>
    </div>
  );
};
