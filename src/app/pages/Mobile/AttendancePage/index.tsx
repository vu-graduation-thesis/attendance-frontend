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

  // const handleAddFace = async (detection: any, newFace: string) => {
  //   const blob = await fetch(newFace).then((r: any) => r.blob());
  //   const image = await faceapi.bufferToImage(blob);

  //   const detections = await faceapi
  //     .detectSingleFace(image)
  //     .withFaceLandmarks()
  //     .withFaceDescriptor();
  //   if (detections) {
  //     const faceDescriptor = detections.descriptor;
  //     // So sánh với các đặc trưng hiện có trong mảng
  //     const isMatched = faces.some(({ descriptor }) => {
  //       const distance = faceapi.euclideanDistance(descriptor, faceDescriptor);
  //       console.log("distance", distance);
  //       return distance < threshold;
  //     });

  //     console.log("isMatched", isMatched);

  //     // Nếu không tìm thấy đặc trưng tương đồng, thêm vào mảng
  //     if (!isMatched) {
  //       setFaces(prev => [
  //         ...prev,
  //         { descriptor: faceDescriptor, image: newFace },
  //       ]);
  //     }
  //   }

  //   // }
  // };

  // console.log("faces", faces);

  // useEffect(() => {
  //   (async () => {
  //     // await CameraPreview.start({
  //     //   position: "rear",
  //     //   width: window.innerWidth,
  //     //   height: Math.floor(window.innerHeight * 0.7),
  //     // });
  //     CameraPreview.startRecordVideo({
  //       position: "rear",
  //       width: window.innerWidth,
  //       height: Math.floor(window.innerHeight * 0.7),
  //       storeToFile: true,
  //     });

  //     setTimeout(async () => {
  //       console.log("stopRecordVideo");
  //       const video = await CameraPreview.stopRecordVideo();
  //       console.log("video", JSON.stringify(video));
  //     }, 5000);
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (isLoadingModels) return;

  //   const contextView = canvasRef.current?.getContext("2d") || ({} as any);
  //   contextView.lineWidth = 2;
  //   contextView.strokeStyle = "green";
  //   contextView?.rect(20, 20, 20, 20);
  //   contextView?.stroke();

  //   const id = setInterval(async () => {
  //     const capture = await CameraPreview.capture({});
  //     // console.log("capture", `data:image/jpeg;base64,${capture.value}`);
  //     const img = new Image();
  //     img.src = `data:image/jpeg;base64,${capture.value}`;

  //     const detections = await faceapi.detectAllFaces(
  //       img,
  //       new faceapi.TinyFaceDetectorOptions(),
  //     );
  //     if (detections?.length) {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const context = canvas.getContext("2d");
  //       context?.drawImage(img, 0, 0);

  //       const face = canvas.toDataURL("image/jpeg", 1.0);
  //       const result = await detectFaces(face);
  //       result?.num_faces?.forEach(face => {
  //         const contextView =
  //           canvasRef.current?.getContext("2d") || ({} as any);
  //         contextView.lineWidth = 2;
  //         contextView.strokeStyle = "black";
  //         // contextView?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  //         const { x, y, w, h } = face?.position || {};
  //         console.log("face", x, y, w, h);
  //         contextView?.rect(x, y, w, h);
  //         contextView?.stroke();
  //         console.log("contextView", contextView);
  //       });
  //       console.log(result?.num_faces);
  //     }
  //   }, 100);

  //   return () => clearInterval(id);
  // }, [isLoadingModels, canvasRef.current]);

  // useEffect(() => {
  //   (async () => {
  //     if (
  //       // !faceapi.nets.faceRecognitionNet.isLoaded &&
  //       // !faceapi.nets.faceLandmark68Net.isLoaded &&
  //       // !faceapi.nets.ssdMobilenetv1.isLoaded &&
  //       !faceapi.nets.tinyFaceDetector.isLoaded
  //     ) {
  //       await Promise.all([
  //         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  //         // faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  //         // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  //         // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  //       ]);
  //     }

  //     console.log("Models loaded");
  //     // await CameraPreview.start({
  //     //   parent: "camera",
  //     //   position: "rear",
  //     //   x: 0,
  //     //   y: 0,
  //     //   width: window.innerWidth,
  //     //   height: Math.floor(window.innerHeight * 0.7),
  //     //   enableZoom: true,
  //     //   toBack: true,
  //     // });

  //     setIsLoadingModels(false);
  //   })();
  //   return () => {
  //     CameraPreview.stop();
  //   };
  // }, []);

  useEffect(() => {
    (async () => {
      // document.body.style.backgroundColor = "transparent !important";
      await CameraPreview.start({
        parent: "camera",
        position: "rear",
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: Math.floor(window.innerHeight * 0.7),
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
        <div className="flex justify-center text-white">
          <Text>Ảnh</Text>
          <Text>Video</Text>
        </div>
        <div className={cx("takePhoto")}>
          <div className={cx("takePhoto2")}>
            <div className={cx("takePhoto3")}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
