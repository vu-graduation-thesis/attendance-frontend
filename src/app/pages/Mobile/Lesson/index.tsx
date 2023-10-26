import { Avatar, List, Skeleton, Typography } from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";

import CameraIcon from "core/assets/images/camera.png";
import CheckedIcon from "core/assets/images/checked.png";
import { useGetSignedUrls } from "core/mutations/file.js";
import { useGetLessons } from "core/queries/lesson.js";
import { routeConfig } from "core/routes/routeConfig.js";

import styles from "./style.module.scss";

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

export const LessonPage = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [currentResource, setCurrentResource] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [filesMapping, setFilesMapping] = useState<any>({});

  const { data: lessonsData, isLoading: lessonLoading } = useGetLessons({
    filter: {
      _id: id,
    },
  });

  const { mutateAsync, isLoading: filesLoading } = useGetSignedUrls();

  const lesson = useMemo(() => lessonsData?.[0], [lessonsData]);

  const images = [
    "https://i.imgur.com/2xqCZ3C.jpg",
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  ];

  const handleOpenImageViewer = useCallback(index => {
    setCurrentResource(index);
    setIsViewerOpen(true);
  }, []);

  const handleCloseImageViewer = () => {
    setCurrentResource(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    if (lessonsData) {
      (async () => {
        const students =
          lesson?.class?.students?.filter((x: any) => x.avatar && x.verified) ||
          [];
        const map = students.map((x: any) => ({
          file: x.avatar,
          bucket: x.verifiedResource?.bucket,
        }));

        const body = map.reduce((acc, cur) => {
          acc[cur.bucket] = acc[cur.bucket] || [];
          acc[cur.bucket].push(cur.file);
          return acc;
        }, {});
        console.log(body);

        const res = await Promise.allSettled(
          Object.keys(body).map(bucket =>
            mutateAsync({
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
        setFilesMapping(data);
      })();
    }
  }, [lessonsData]);

  return (
    <div className={cx("container")}>
      <div className="flex justify-between">
        <Title level={4}>
          Buổi học: {lesson?.order || "?"}/{lesson?.class?.totalNumberOfLessons}
        </Title>
        <div>
          <img
            src={CameraIcon}
            alt=""
            onClick={() => navigator(`/app/attendance/${id}`)}
          />
        </div>
      </div>
      <div>
        <Text>Môn học: {lesson?.class?.subject?.name}</Text>
      </div>
      <Text>Ca học: 7:30 - 9:30</Text>
      <div className={cx("", "mb-20")}>
        <Text>
          Ngày học:{" "}
          {lesson?.lessonDay && moment(lesson?.lessonDay).format("DD/MM/yyyy")}
        </Text>
      </div>

      <Title level={4}>Dữ liệu ảnh/video</Title>
      <div className={cx("wrap-resource")}>
        <div
          className={cx("resource")}
          onClick={() => handleOpenImageViewer(0)}
        >
          <img src={CheckedIcon} alt="" />
        </div>
        <div className={cx("resource")}>
          <img src={CheckedIcon} alt="" />
        </div>
        <div className={cx("resource")}>
          <img src={CheckedIcon} alt="" />
        </div>
        <div className={cx("resource")}>
          <img src={CheckedIcon} alt="" />
        </div>
        <div className={cx("resource")}>
          <img src={CheckedIcon} alt="" />
        </div>
        <div className={cx("resource")}>
          <img src={CheckedIcon} alt="" />
        </div>
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentResource}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={handleCloseImageViewer}
        />
      )}

      <Title level={4}>Danh sách sinh viên</Title>
      <div>
        {!!lesson?.attendances?.length && (
          <Text>
            Đã điểm danh: {lesson?.attendances?.length}/
            {lesson?.class?.students?.length}
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
                avatar={<Avatar src={filesMapping?.[item.avatar]} />}
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
              <img src={CheckedIcon} alt="" />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
