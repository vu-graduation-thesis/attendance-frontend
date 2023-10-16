import { Avatar, List, Skeleton, Typography } from "antd";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";

import CameraIcon from "core/assets/images/camera.png";
import CheckedIcon from "core/assets/images/checked.png";

import styles from "./style.module.scss";

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

export const LessonPage = () => {
  const navigator = useNavigate();
  const [currentResource, setCurrentResource] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
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

  return (
    <div className={cx("container")}>
      <div className="flex justify-between">
        <Title level={4}>Buổi học: 5/12</Title>
        <div>
          <img src={CameraIcon} alt="" onClick={() => navigator("/app/home")} />
        </div>
      </div>
      <div>
        <Text>Môn học: Nguyên lý hệ điều hành</Text>
      </div>
      <Text>Thời gian: 7:30 - 9:30</Text>

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
        <Text>Đã điểm danh: 30/40</Text>
      </div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={[1, 2, 3, 4, 5]}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                avatar={<Avatar />}
                title={<a href="https://ant.design">{item}</a>}
                description={
                  <>
                    <span>Nguyen Van A</span>
                    <br />
                    <span>19A03</span>
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
