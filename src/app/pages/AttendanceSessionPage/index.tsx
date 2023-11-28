import { Button, Spin, Statistic, Typography, notification } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";

import FrameIcon from "core/assets/images/frame.png";
import LogoIcon from "core/assets/images/logo.png";
import { DISTANCE_ERROR, EXPIRED_TIME_ERROR } from "core/constants/common.ts";
import { useAttendanceSession, useUploadFaces } from "core/mutations/core.js";
import { useGetLessons } from "core/queries/lesson.ts";
import { useGetUserInfo } from "core/queries/user.ts";
import { routeConfig } from "core/routes/routeConfig.ts";
import { isMobile } from "core/utils/brower.js";
import getLocation from "core/utils/location.ts";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const NUMBER_OF_IMAGES = 1;

const { Text, Title } = Typography;
const { Countdown } = Statistic;

export const AttendanceSessionPage = () => {
  const { lessionId } = useParams();
  const canvasRef = useRef<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const collectFaceRef = useRef<any>(null);
  const [openGuide, setOpenGuide] = useState<boolean>(true);
  const { mutateAsync: uploadFaces, isLoading } = useAttendanceSession();
  const { data: userInfo } = useGetUserInfo();
  const navigate = useNavigate();
  const [notiApi, contextHolder] = notification.useNotification();
  const { data: lessonData } = useGetLessons({
    filter: {
      _id: lessionId,
    },
  });

  const handleUploadFace = async (image: string) => {
    const location = await getLocation();

    uploadFaces({
      lessionId,
      image,
      location,
    } as any)
      .then(() => {
        notiApi.success({
          message: "Thành công",
          description: `Điểm danh thành công`,
        });
      })
      .catch(err => {
        const code = err?.response?.data?.error?.code;
        if (code === EXPIRED_TIME_ERROR) {
          setImages([]);
          notiApi.error({
            message: "Thất bại",
            description: `Đã hết thời gian điểm danh`,
          });
          return;
        }

        if (code === DISTANCE_ERROR) {
          setImages([]);
          notiApi.error({
            message: "Thất bại",
            description: `Bạn đang ở quá xa phòng học`,
          });
          return;
        }

        notiApi.error({
          message: "Thất bại",
          description: `Đã xảy ra lỗi khi nhận diện ảnh`,
        });
      });
  };

  const faceMyDetect = () => {
    const intervalId: any = setInterval(async () => {
      const video: any = document.querySelector("#cameraPreview video");

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions(),
      );

      if (canvasRef.current) {
        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(video);
        if (detections?.length === 1 && detections?.[0]?.score > 0.7) {
          const capture = await CameraPreview.capture({});

          const imageDataURL = `data:image/jpeg;base64,${capture.value}`;
          handleUploadFace(imageDataURL);
          CameraPreview.stop();
          clearInterval(intervalId);
          collectFaceRef.current.style.display = "none";
          setImages([...images, imageDataURL]);
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
    Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")]).then(
      () => {
        console.log("Models loaded");
      },
    );
  }, []);
  return (
    <div className={cx("container")}>
      {contextHolder}
      <img className={cx("logo")} src={LogoIcon} alt="" />
      <h3 className={cx("title")}>Điểm danh bằng khuôn mặt</h3>
      {!!userInfo && (
        <div className={cx("info", "mb-20")}>
          <Title level={5}>Sinh viên: {userInfo?.student?.name}</Title>
          <Text>Mã sinh viên: {userInfo?.student?.studentId}</Text> <br />
          <Text>Email: {userInfo?.email}</Text> <br />
          <Text>
            Trạng thái:{"  "}
            {userInfo?.student?.verified ? (
              <b className="text-green">Đã cung cấp dữ liệu khuôn mặt</b>
            ) : (
              <b className="text-red">Chưa cung cấp dữ liệu khuôn mặt</b>
            )}
          </Text>{" "}
          <br />
          <Text>
            Môn học:{" "}
            {`${lessonData?.[0]?.class?.name || ""} - ${
              lessonData?.[0]?.classroom?.name || ""
            }`}
          </Text>{" "}
          <br />
          <div className="flex justify-center flex-col align-center mt-20">
            <h3>Thời gian còn lại</h3>
            <Countdown
              value={dayjs(lessonData?.[0]?.endAttendanceSessionTime).unix()}
              format="HH:mm:ss"
            />
          </div>
        </div>
      )}
      {!!userInfo && userInfo?.student?.verified ? (
        <>
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
                    <span className={cx("text")}>Nhìn thẳng vào camera</span>
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
        </>
      ) : (
        <>
          <Text>Bạn cần cung cấp dữ liệu khuôn mặt trước khi điểm danh</Text>{" "}
          <br />
          <Button
            type="primary"
            onClick={() =>
              navigate(`${routeConfig.collectFace}?backToLesson=${lessionId}`)
            }
            className={cx("btnGoToCollect")}
          >
            Xác minh ngay
          </Button>
        </>
      )}

      {isLoading && <Spin tip="Đang tải lên..." size="large"></Spin>}

      <Button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        danger
        className={cx("btnBack")}
      >
        Đăng xuất
      </Button>
    </div>
  );
};
