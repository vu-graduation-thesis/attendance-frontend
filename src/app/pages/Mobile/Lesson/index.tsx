import { Avatar, Button, Image, List, Skeleton, Typography } from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { Capacitor } from "@capacitor/core";

import { AttendanceLog } from "core/app/containers/AttendanceLog/index.js";
import CameraIcon from "core/assets/images/camera.png";
import AttendanceManualIcon from "core/assets/images/check.png";
import CheckedIcon from "core/assets/images/checked.png";
import FaceDetectIcon from "core/assets/images/face-detection.png";
import PeriousIcon from "core/assets/images/previous.png";
import configs from "core/configs/index.js";
import { useGetSignedUrls } from "core/mutations/file.js";
import { useManualAttendace } from "core/mutations/lesson.js";
import { useGetAttendanceLog } from "core/queries/attendanceLog.js";
import { useGetLessons } from "core/queries/lesson.js";
import { routeConfig } from "core/routes/routeConfig.ts";

import styles from "./style.module.scss";

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

export const LessonPage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [filesMapping, setFilesMapping] = useState<any>({});
  const { mutateAsync: manualAttendace } = useManualAttendace();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const headerRef = useRef<any>();
  const { data: attendanceLog, refetch: refetchAttendanceLog } =
    useGetAttendanceLog(id!);
  const queryClient = useQueryClient();
  const {
    data: lessonsData,
    isLoading: lessonLoading,
    refetch: refetchLessons,
  } = useGetLessons({
    filter: {
      _id: id,
    },
  });

  const { mutateAsync: getSignedUrls, isLoading: filesLoading } =
    useGetSignedUrls();

  const lesson = useMemo(() => lessonsData?.[0], [lessonsData]);
  const attendancesState = useMemo(
    () =>
      lesson?.attendances?.reduce((acc: any, curr: any) => {
        acc[curr.student] = curr.type;
        return acc;
      }, {}),
    [lesson],
  );

  const handleManualAttendance = useCallback(
    async (student: string) => {
      await manualAttendace({
        lessonId: id!,
        studentId: student,
      });
      refetchLessons();
    },
    [id, manualAttendace, refetchLessons],
  );

  useEffect(() => {
    if (lessonsData) {
      // get avatar of students
      (async () => {
        try {
          const students =
            lesson?.class?.students?.filter(
              (x: any) => x.avatar && x.verified,
            ) || [];
          const map = students.map((x: any) => ({
            file: x.avatar,
            bucket: x.verifiedResource?.bucket,
          }));

          const body = map.reduce((acc: any, cur: any) => {
            acc[cur.bucket] = acc[cur.bucket] || [];
            acc[cur.bucket].push(cur.file);
            return acc;
          }, {});

          const res = await Promise.allSettled(
            Object.keys(body).map(bucket =>
              getSignedUrls({
                bucket,
                files: body[bucket],
              }),
            ),
          );

          const data = res.reduce((acc, cur) => {
            if (cur.status === "fulfilled") {
              acc = { ...acc, ...cur.value };
            }
            return acc;
          }, {});
          setFilesMapping(prev => ({ ...prev, ...data }));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [lessonsData]);

  useEffect(() => {
    if (attendanceLog?.logs?.length) {
      (async () => {
        const cache: any =
          queryClient.getQueryData(["attendanceLog", id!]) || {};

        const payloads = attendanceLog?.logs?.reduce((acc: any, cur: any) => {
          if (!cache[cur.detectedFile]) {
            acc.push({
              files: [cur.originalFile, cur.detectedFile],
              bucket: cur.bucket,
            });
          }
          return acc;
        }, []);

        const result = await Promise.allSettled(
          payloads.map((item: any) => getSignedUrls(item)),
        );

        const files = result.reduce((acc: any, cur: any) => {
          if (cur.status === "fulfilled") {
            acc = { ...acc, ...(cur.value || {}) };
          }
          return acc;
        }, {});

        queryClient.setQueryData(["attendanceLog", id!], files);
        setFilesMapping((prev: any) => ({ ...prev, ...files }));
      })();
    }
  }, [attendanceLog]);

  const logs = useMemo(() => {
    const newLogs = [...(attendanceLog?.logs || [])];
    return newLogs.reverse();
  }, [attendanceLog]);

  const attendanceCount = useMemo(
    () =>
      lesson?.class?.students?.reduce(
        (prev: any, acc: any) =>
          lesson?.attendances?.some((u: any) => u.student === acc?._id)
            ? prev + 1
            : prev,
        0,
      ),
    [lesson],
  );

  const predictMap = useMemo(() => {
    if (logs?.length > 0) {
      const predicts = logs.reduce((acc: any, cur: any) => {
        if (cur.predict) {
          acc = acc.concat(cur.predict);
        }
        return acc;
      }, []);

      const uniqueMax = predicts.reduce((acc: any, cur: any) => {
        if (acc[cur.label]) {
          acc[cur.label] = Math.max(acc[cur.label].confidence, cur.confidence);
        } else {
          acc[cur.label] = cur;
        }
        return acc;
      }, {});

      return uniqueMax;
    }
  }, [logs]);

  console.log("predictMap", predictMap);

  useEffect(() => {
    refetchAttendanceLog();
  }, []);

  return (
    <div className={cx("container")}>
      <div className="p-16 pb-0 sticky bg-white" ref={headerRef}>
        <div className="flex justify-between">
          <div className="flex align-center">
            {Capacitor.isNativePlatform() && (
              <img
                src={PeriousIcon}
                alt=""
                onClick={() => navigator(routeConfig.mobile.schedule)}
                width={24}
                className="mb-10 mr-20"
              />
            )}
            <Title level={4}>
              Buổi học: {lesson?.order || "?"}/
              {lesson?.class?.totalNumberOfLessons}
            </Title>
          </div>
          <div>
            {Capacitor.isNativePlatform() ? (
              <Button
                icon={<img src={CameraIcon} alt="" width={40} />}
                onClick={() =>
                  navigator(`${configs.basePath}/attendance/${id}`)
                }
                size="large"
                style={{ height: 55, width: 55, border: "2px solid #256dd2" }}
              ></Button>
            ) : (
              <Button type="primary" onClick={() => setOpenDrawer(true)}>
                Xem chi tiết
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={cx("container")}>
        <div>
          <Text>Môn học: {lesson?.class?.subject?.name}</Text>
        </div>
        <Text>Ca học: 7:30 - 9:30</Text>
        <div className={cx("", "mb-20")}>
          <Text>
            Ngày học:{" "}
            {lesson?.lessonDay &&
              moment(lesson?.lessonDay).format("DD/MM/yyyy")}
          </Text>
        </div>

        <Title level={4}>Danh sách sinh viên</Title>
        <div>
          {!!lesson?.attendances?.length && (
            <Text>
              Đã điểm danh: {attendanceCount}/{lesson?.class?.students?.length}
            </Text>
          )}
        </div>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={lesson?.class?.students || [1, 2, 3, 4, 5, 6]}
          renderItem={(item: any) => (
            <List.Item>
              <Skeleton avatar title={false} active loading={lessonLoading}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={filesMapping?.[item.avatar]} size={60} />
                  }
                  title={<a href="https://ant.design">{item?.name}</a>}
                  description={
                    <>
                      <div>
                        <span>Mã sinh viên: </span>
                        <Text className="mr-20">
                          {item?.studentId || "Chưa cập nhật"}
                        </Text>
                      </div>
                      <div>
                        <span>Lớp hành chính: </span>
                        <Text className="mr-20">
                          {item?.administrativeClass || "Chưa cập nhật"}
                        </Text>
                      </div>
                      {!item?.verified && (
                        <span>
                          Trạng thái:{" "}
                          {!item?.verified && (
                            <Text className="mr-20 text-red">
                              Chưa cung cấp dữ liệu khuôn mặt
                            </Text>
                          )}
                        </span>
                      )}
                      <br />
                    </>
                  }
                />

                {predictMap?.[item?.studentId] ? (
                  <Image
                    src={`${configs.apiEndpoint.replace("api", "uploads")}/${
                      predictMap?.[item?.studentId]?.imageDetector
                    }`}
                    style={{
                      marginRight: "30px",
                    }}
                  />
                ) : (
                  <div></div>
                )}

                <div className={cx("action")}>
                  {attendancesState?.[item?._id] === "MANUAL" ? (
                    <img
                      src={CheckedIcon}
                      alt=""
                      width={24}
                      className="relative r-10"
                    />
                  ) : attendancesState?.[item?._id] === "AI_DETECTED" ? (
                    <img
                      src={FaceDetectIcon}
                      alt=""
                      width={55}
                      className="relative r--7"
                    />
                  ) : (
                    <img
                      src={AttendanceManualIcon}
                      alt=""
                      className="cursor-pointer"
                      onClick={() => handleManualAttendance(item?._id)}
                      width={40}
                    />
                  )}
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>

      <AttendanceLog
        isLoading={filesLoading}
        onClose={() => {
          setOpenDrawer(false);
          // setLatestImage(undefined);
        }}
        open={openDrawer}
        dataSource={logs || []}
        filesMapping={filesMapping}
        placement={Capacitor.isNativePlatform() ? "bottom" : "right"}
      />
    </div>
  );
};
