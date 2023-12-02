import { Button, Spin, Typography } from "antd";
import classNames from "classnames/bind";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";

import FrameIcon from "core/assets/images/frame.png";
import LogoIcon from "core/assets/images/logo.png";
import { useUploadFaces } from "core/mutations/core.js";
import { useGetStudentDetail } from "core/queries/student.js";
import { useGetUserInfo } from "core/queries/user.ts";
import { isMobile } from "core/utils/brower.js";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const NUMBER_OF_IMAGES = 10;

const { Text, Title } = Typography;

export const CollectFacePage = () => {
  const canvasRef = useRef<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const collectFaceRef = useRef<any>(null);
  const [openGuide, setOpenGuide] = useState<boolean>(true);
  const { mutateAsync: uploadFaces, isLoading } = useUploadFaces();
  const { data: userInfo, refetch } = useGetUserInfo();
  const navigate = useNavigate();

  const faceMyDetect = () => {
    const intervalId: any = setInterval(async () => {
      const video: any = document.querySelector("#cameraPreview video");

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions(),
      );

      if (canvasRef.current) {
        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(video);
        if (detections?.length < 2 && detections?.[0]?.score > 0.5) {
          const capture = await CameraPreview.capture({});

          const imageDataURL = `data:image/jpeg;base64,${capture.value}`;
          setImages(prev => {
            if (prev.length >= NUMBER_OF_IMAGES) {
              CameraPreview.stop();
              clearInterval(intervalId);
              collectFaceRef.current.style.display = "none";
              return prev;
            } else {
              return [...prev, imageDataURL];
            }
          });
        }
      }

      faceapi.matchDimensions(canvasRef.current, {
        width: 300,
        height: 400,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 300,
        height: 400,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
    }, 200);
  };

  const handleCollectStart = () => {
    const size = isMobile()
      ? {
          height: 300,
          width: 400,
        }
      : {
          height: 400,
          width: 300,
        };

    const cameraPreviewOptions: CameraPreviewOptions = {
      ...size,
      parent: "cameraPreview",
    };

    CameraPreview.start(cameraPreviewOptions).then(() => {
      console.log("Camera preview started");
      setOpenGuide(false);
      faceMyDetect();
    });
  };

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      console.log("Models loaded");
    });
  }, []);

  useEffect(() => {
    // bad code
    let interval: any;
    if (images.length === NUMBER_OF_IMAGES) {
      uploadFaces(images);
      interval = setInterval(() => {
        refetch();
      }, 1500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <div className={cx("container")}>
      <img className={cx("logo")} src={LogoIcon} alt="" />
      <h3 className={cx("title")}>Cung cấp dữ liệu khuôn mặt</h3>
      {!!userInfo && (
        <div className={cx("info", "mb-20")}>
          <Title level={5}>Sinh viên: {userInfo?.student?.name}</Title>
          <Text>Mã sinh viên: {userInfo?.student?.studentId}</Text> <br />
          <Text>
            Trạng thái:{"  "}
            {userInfo?.student?.verified ? (
              <b className="text-green">Đã cung cấp dữ liệu khuôn mặt</b>
            ) : (
              <b className="text-red">Chưa cung cấp dữ liệu khuôn mặt</b>
            )}
          </Text>{" "}
          <br />
        </div>
      )}
      {!!userInfo && !userInfo?.student?.verified && (
        <div className={cx("wrapperCamera")} ref={collectFaceRef}>
          <div id="cameraPreview" className={cx("cameraPreview")}>
            <div className={cx("guide")}>
              {openGuide ? (
                <>
                  <span className={cx("text")}>Đưa khuôn mặt vào khung</span>
                  <img src={FrameIcon} alt="" className={cx("frame")} />
                </>
              ) : (
                <div className={cx("guideInProcess")}>
                  <span className={cx("text")}>Quay các góc mặt</span>
                  <div className={cx("percent")}>
                    {Math.floor((images.length / NUMBER_OF_IMAGES) * 100)} %
                  </div>
                </div>
              )}
            </div>

            <canvas
              width={300}
              height={400}
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: 999,
              }}
            ></canvas>
          </div>
          <Button
            type="primary"
            onClick={handleCollectStart}
            className={cx("btnStart")}
          >
            Bắt đầu
          </Button>
        </div>
      )}

      {isLoading && <Spin tip="Đang tải lên..." size="large"></Spin>}

      <Button
        type="primary"
        onClick={() => navigate("/")}
        className={cx("btnBack")}
      >
        Quay về trang chủ
      </Button>
    </div>
  );
};
