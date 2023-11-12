import { Button, UploadProps, notification } from "antd";
import { Upload, message } from "antd";
import { RcFile } from "antd/es/upload/interface.js";
import React from "react";

import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  maxCount: 1,
  listType: "text",
  beforeUpload: () => false,
};

const UploadFile: React.FC = ({ handleUpload }: any) => {
  const [file, setFile] = React.useState<RcFile>();
  const [notiApi, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <Dragger
        {...props}
        onChange={(e: any) => {
          setFile(e.file);
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click hoặc kéo thả file vào đây</p>
        <p className="ant-upload-hint">
          Hỗ trợ các file có định dạng: .csv, .xlsx, .xls
        </p>
      </Dragger>
      <div className="flex flex-end">
        <Button
          type="primary"
          className="mt-10"
          onClick={async () => {
            try {
              const form = new FormData();
              form.append("file", file as RcFile);
              await handleUpload(form);
              notiApi.success({
                message: "Thành công",
                description: `Đã tải lên file ${file?.name} thành công`,
              });
            } catch (error) {
              notiApi.error({
                message: "Thất bại",
                description: `Đã xảy ra lỗi khi xử lý file lên`,
              });
            }
          }}
        >
          Tải lên
        </Button>
      </div>
    </>
  );
};

export default UploadFile;
