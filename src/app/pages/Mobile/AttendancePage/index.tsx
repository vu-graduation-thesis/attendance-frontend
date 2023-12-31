import { Spin, Typography, notification } from "antd";
import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { CameraPreview } from "@capacitor-community/camera-preview";

import { AttendanceLog } from "core/app/containers/AttendanceLog/index.js";
import BackIcon from "core/assets/images/back.png";
import configs from "core/configs/index.js";
import { useDetectFace } from "core/mutations/faceRecognition.ts";
import { useGetSignedUrls } from "core/mutations/file.js";
import { useGetAttendanceLog } from "core/queries/attendanceLog.js";

import styles from "./style.module.scss";

const { Text } = Typography;

const cx = classNames.bind(styles);
export const AttendancePage = () => {
  const { id: lessonId } = useParams();
  const { mutateAsync: detectFaces, isLoading: isRecognize } = useDetectFace();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [latestImage, setLatestImage] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { data: attendanceLog, refetch: refetchAttendanceLog } =
    useGetAttendanceLog(lessonId!);
  const { mutateAsync: getSignedUrls, isLoading: filesLoading } =
    useGetSignedUrls();
  const [notiApi, contextHolder] = notification.useNotification();
  const [filesMapping, setFilesMapping] = useState<any>({});
  const [imageCount, setImageCount] = useState<number>(0);
  const [flash, setFlash] = useState<boolean>(false);
  const topContainerRef = useRef<HTMLDivElement>(null);
  const [isOpenCamera, setIsOpenCamera] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handlCapture = async () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
    }, 150);
    const capture = await CameraPreview.capture({
      quality: 100,
    });

    const image = `data:image/jpeg;base64,${capture.value}`;
    setLatestImage(image);
    setImageCount(prev => prev + 1);

    const result = await detectFaces({
      lessonId: lessonId!,
      file: image,
    });
    refetchAttendanceLog();

    notiApi.success({
      message: "Thành công",
      description: `Đã nhận diện ${
        result?.predict?.length || 0
      } sinh viên trong ảnh vừa chụp`,
    });
  };

  useEffect(() => {
    (async () => {
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
      setIsOpenCamera(true);
    })();
    return () => {
      CameraPreview.stop();
    };
  }, []);

  useEffect(() => {
    // update number of images
    setImageCount(attendanceLog?.logs?.length || 0);
    console.log("attendanceLog", attendanceLog);
    if (attendanceLog?.logs?.length) {
      (async () => {
        // const cache: any =
        //   queryClient.getQueryData(["attendanceLog", lessonId!]) || {};

        // console.log("payloads", cache);

        // const payloads = attendanceLog?.logs?.reduce((acc: any, cur: any) => {
        //   if (!cache[cur.detectedFile]) {
        //     acc.push({
        //       files: [cur.originalFile, cur.detectedFile],
        //       bucket: cur.bucket,
        //     });
        //   }
        //   return acc;
        // }, []);
        const payloads = attendanceLog?.logs?.map((item: any) => ({
          files: [item.originalFile, item.detectedFile],
          bucket: item.bucket,
        }));

        const result = await Promise.allSettled(
          payloads.map((item: any) => getSignedUrls(item)),
        );

        const files = result.reduce((acc: any, cur: any) => {
          if (cur.status === "fulfilled") {
            acc = { ...acc, ...(cur.value || {}) };
          }
          return acc;
        }, {});

        queryClient.setQueryData(["attendanceLog", lessonId!], files);
        setFilesMapping((prev: any) => ({ ...prev, ...files }));
      })();
    }
  }, [attendanceLog]);

  const logs = useMemo(() => {
    const newLogs = [...(attendanceLog?.logs || [])];
    return newLogs.reverse();
  }, [attendanceLog]);

  useEffect(() => {
    if (topContainerRef.current && isOpenCamera) {
      topContainerRef.current.style.backgroundColor = "transparent";
    }
  }, [topContainerRef.current, isOpenCamera]);

  return (
    <div className={cx("container")}>
      {contextHolder}
      <div className={cx("fix-top")} ref={topContainerRef}>
        {flash && <div className={cx("flash")}></div>}
        <div id="camera"></div>
        <canvas className="canvas" ref={canvasRef}></canvas>
        <div className={cx("guide")}>
          <Text className={cx("guide-text")}>Chụp hoặc quay video lớp học</Text>
        </div>
      </div>
      <div className={cx("bottom")}>
        <div
          className={cx("image-recents")}
          onClick={() => {
            setOpenDrawer(true);
            refetchAttendanceLog();
          }}
        >
          <div className="over-hidden">
            <img
              src={filesMapping?.[logs?.[0]?.originalFile] || latestImage}
              alt=""
            />
          </div>
          <div className={cx("progress")}>
            <div className={cx("progress-bar")}>
              <Spin spinning={isRecognize} />
            </div>
          </div>
          <div className={cx("counter", "z-1000000")}>
            <Text className="text-white">{imageCount}</Text>
          </div>
        </div>
        <div className={cx("flex", "justify-center", "text-white", "option")}>
          <Text className="text-yellow m-5">Ảnh</Text>
          <Text className="text-white m-5 disable">Video</Text>
        </div>
        <div className={cx("takePhoto")} onClick={handlCapture}>
          <div className={cx("takePhoto2")}>
            <div className={cx("takePhoto3")}></div>
          </div>
        </div>
        <div className={cx("image-recent")}>
          <img
            src={BackIcon}
            alt=""
            width={32}
            onClick={() => {
              queryClient.refetchQueries(["get-lessons"]);
              navigate(configs.basePath + `/lesson/${lessonId}`, {
                replace: true,
              });
            }}
          />
        </div>
      </div>
      <AttendanceLog
        isLoading={filesLoading}
        onClose={() => {
          setOpenDrawer(false);
          setLatestImage(undefined);
        }}
        open={openDrawer}
        dataSource={logs || []}
        filesMapping={filesMapping}
      />
    </div>
  );
};
