import {
  Collapse,
  Drawer,
  Image,
  List,
  Spin,
  Typography,
  notification,
} from "antd";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

import { CameraPreview } from "@capacitor-community/camera-preview";

import BackIcon from "core/assets/images/back.png";
import configs from "core/configs/index.js";
import { useDetectFace } from "core/mutations/faceRecognition.ts";

import styles from "./style.module.scss";

const { Text } = Typography;

const cx = classNames.bind(styles);
export const AttendancePage = () => {
  const { id: lessonId } = useParams();
  const { mutateAsync: detectFaces, isLoading: isRecognize } = useDetectFace();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [resources, setResources] = useState<any[]>([]);

  const [notiApi, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const handlCapture = async () => {
    const capture = await CameraPreview.capture({
      quality: 100,
    });

    const image = `data:image/jpeg;base64,${capture.value}`;
    setImages(pre => [...pre, image]);
    const key = new Date().getTime();
    setResources(pre => [...pre, { key, image }]);

    const result = await detectFaces({
      lessonId,
      file: image,
    });

    notiApi.success({
      message: "Thành công",
      description: `Đã nhận diện ${
        result?.predict?.length || 0
      } sinh viên trong ảnh vừa chụp`,
    });

    setResources(pre => {
      const index = pre.findIndex(item => item.key === key);
      console.log(index);
      pre[index] = {
        ...pre[index],
        predict: result?.predict,
      };
      return [...pre];
    });
  };

  console.log(resources);

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
      {contextHolder}
      <div className={cx("fix-top")}>
        <div id="camera"></div>
        <canvas className="canvas" ref={canvasRef}></canvas>
        <div className={cx("guide")}>
          <Text className={cx("guide-text")}>Chụp hoặc quay video lớp học</Text>
        </div>
      </div>
      <div className={cx("bottom")}>
        <div
          className={cx("image-recents")}
          onClick={() => setOpenDrawer(true)}
        >
          <div className="over-hidden">
            {!!images?.length && (
              <img src={images?.[images?.length - 1]} alt="" width="100%" />
            )}
          </div>
          <div className={cx("progress")}>
            <div className={cx("progress-bar")}>
              <Spin spinning={isRecognize} />
            </div>
          </div>
          <div className={cx("counter", "relative", "z-1000000")}>
            <Text className="text-white">{images?.length}</Text>
          </div>
        </div>
        <div className={cx("flex", "justify-center", "text-white", "option")}>
          <Text className="text-yellow m-5">Ảnh</Text>
          <Text className="text-white m-5">Video</Text>
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
            onClick={() =>
              navigate(configs.basePath + `/lesson/${lessonId}`, {
                replace: true,
              })
            }
          />
        </div>
      </div>
      <Drawer
        title="Ảnh, video vừa chụp"
        placement={"bottom"}
        width={window.innerWidth}
        height={window.innerHeight * 0.8}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={resources}
          renderItem={(item: any) => (
            <List.Item>
              <div className={cx("draw_images")}>
                <div className="row justify-between">
                  <div className="col-6">Ảnh gốc</div>
                  <div className="col-6">Ảnh nhận diện</div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Image
                      src={item.image}
                      style={{
                        height: 100,
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <Image
                      src={item.image}
                      style={{
                        height: 100,
                      }}
                    />
                  </div>
                </div>
                <Collapse className="mt-20">
                  <Collapse.Panel
                    header={`Kết quả nhận diện (${
                      item?.predict?.length || 0
                    } sinh viên)`}
                    key="1"
                  >
                    {item?.predict?.length > 0 && (
                      <div className="row">
                        <div className="col-6 bold">Mã sinh viên</div>
                        <div className="col-6 text-right bold">
                          Tỉ lệ dự đoán
                        </div>
                      </div>
                    )}
                    {item?.predict?.map((predict: any) => (
                      <div className="row">
                        <div className="col-6">{predict?.label}</div>
                        <div className="col-6 text-right">
                          {Math.round(predict?.confidence * 100)}%
                        </div>
                      </div>
                    ))}
                  </Collapse.Panel>
                </Collapse>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};
