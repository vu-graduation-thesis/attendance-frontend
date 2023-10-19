import { Modal } from "antd";
import { Upload, message } from "antd";

import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface Props {
  isModalOpen: boolean;
  handleOk: (data: any) => void;
  title: string;
  handleCancel?: () => void;
}

export const ModalUpload = (props: Props) => {
  const { isModalOpen, handleOk, handleCancel, title } = props;
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </Modal>
  );
};
