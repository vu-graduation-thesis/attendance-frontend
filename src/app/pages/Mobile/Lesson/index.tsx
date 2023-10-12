import { Avatar, List, Skeleton, Typography } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import CameraIcon from "core/assets/images/camera.png";
import CheckedIcon from "core/assets/images/checked.png";

import styles from "./style.module.scss";

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

export const LessonPage = () => {
  const navigator = useNavigate();
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
