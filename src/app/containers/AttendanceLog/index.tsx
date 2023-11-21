import { Collapse, Drawer, Image, List, Spin } from "antd";
import classNames from "classnames/bind";

import styles from "./style.module.scss";

const cx = classNames.bind(styles);

export const AttendanceLog = ({
  isLoading,
  onClose,
  open,
  dataSource,
  filesMapping,
  placement = "bottom",
}) => {
  return (
    <Drawer
      title={
        <>
          Ảnh, video vừa chụp
          <Spin spinning={isLoading} />
        </>
      }
      placement={placement!}
      width={placement === "bottom" ? window.innerWidth : 400}
      height={
        placement === "bottom" ? window.innerHeight * 0.8 : window.innerHeight
      }
      onClose={onClose}
      open={open}
    >
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item: any, index: any) => (
          <List.Item key={index}>
            <div className={cx("draw_images")}>
              <div className="row justify-between">
                <div className="col-6">Ảnh gốc</div>
                <div className="col-6">Ảnh nhận diện</div>
              </div>
              <div className="row justify-between">
                <div className="col-6">
                  <Image
                    src={filesMapping?.[item?.originalFile]}
                    style={{
                      height: 100,
                      paddingRight: 10,
                    }}
                  />
                </div>
                <div className="col-6">
                  <Image
                    src={filesMapping?.[item?.detectedFile]}
                    style={{
                      height: 100,
                      paddingLeft: 10,
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
                      <div className="col-6 text-right bold">Tỉ lệ dự đoán</div>
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
  );
};
