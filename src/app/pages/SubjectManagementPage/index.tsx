import {
  Button,
  Dropdown,
  Form,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  notification,
} from "antd";
import classNames from "classnames/bind";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { EditableCell } from "core/app/components/EditableCell/index.tsx";
import UploadFile from "core/app/components/Upload/index.js";
import CheckedIcon from "core/assets/images/checked.png";
import CloseIcon from "core/assets/images/close.png";
import DeleteIcon from "core/assets/images/delete.png";
import DownIcon from "core/assets/images/down.png";
import EditIcon from "core/assets/images/edit.png";
import {
  DEFAULT_CURRENT_PAGE_START_WHITH_1,
  DEFAULT_PAGE_SIZE,
} from "core/constants";
import { ADD_PREFIX, EXISTED_ERROR_CODE } from "core/constants/common.ts";
import { useGetSignedUrls } from "core/mutations/file.js";
import { useBatchCreateSubject } from "core/mutations/subject.js";
import { useCreateSubject, useUpdateSubject } from "core/mutations/subject.ts";
import { useGetSubjects } from "core/queries/subject.ts";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const SubjectManagementPage = () => {
  const { data: subjectsData, isLoading, refetch } = useGetSubjects();
  const { mutateAsync: updateSubject } = useUpdateSubject();
  const { mutateAsync: createSubject } = useCreateSubject();

  const [openModal, setOpenModal] = useState(false);
  const [notiApi, contextHolder] = notification.useNotification();
  const { mutateAsync: batchCreateSubjects } = useBatchCreateSubject();
  const { mutateAsync: getSignedUrls } = useGetSignedUrls();

  const [dataTable, setDataTable] = useState<any>();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const isEditing = (record: any) => record._id === editingKey;

  const addNewRow = () => {
    if (editingKey.includes(ADD_PREFIX)) {
      return;
    }
    const newData = {
      _id: ADD_PREFIX + new Date().getTime(),
      name: "",
      type: "",
    };
    form.setFieldsValue({ ...newData });
    setEditingKey(newData._id);
    setDataTable([newData, ...dataTable]);
  };

  const edit = (record: any) => {
    if (editingKey.includes(ADD_PREFIX)) {
      setDataTable(dataTable.filter((item: any) => item._id !== editingKey));
    }
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    if (editingKey.includes(ADD_PREFIX)) {
      setDataTable(dataTable.filter((item: any) => item._id !== editingKey));
    }
    setEditingKey("");
    form.resetFields();
  };

  const handleDelete = async (record: any) => {
    try {
      await updateSubject({ id: record?._id, isDeleted: true });
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const save = async (record: any) => {
    try {
      const row = await form.validateFields();
      console.log("row", row, record);
      if (editingKey.includes(ADD_PREFIX)) {
        await createSubject(row);
      } else {
        await updateSubject({ id: record?._id, ...row });
      }
      setEditingKey("");
      form.resetFields();
      refetch();
    } catch (errInfo) {
      if (
        (errInfo as any)?.response?.data?.error?.code === EXISTED_ERROR_CODE
      ) {
        form.setFields([
          {
            name: "name",
            errors: [t("subject.usernameExisted")],
          },
        ]);
      }
    }
  };
  const pagination = useMemo(
    () => ({
      currentPage:
        Number(searchParams.get("currentPage")) ||
        DEFAULT_CURRENT_PAGE_START_WHITH_1,
      pageSize: Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE,
    }),
    [searchParams],
  );

  const tableParams = useMemo(
    () => ({
      pagination: {
        ...pagination,
        onChange: cancel,
      },
    }),
    [pagination, cancel],
  );

  const columns: any = useMemo(
    () => [
      {
        title: t("subject.id"),
        dataIndex: "_id",
        key: "_id",
        width: 250,
        render: (value: any) => (value?.includes(ADD_PREFIX) ? "" : value),
      },
      {
        title: t("subject.name"),
        dataIndex: ["name"],
        key: ["name"],
        width: 250,
        editable: true,
      },
      {
        title: t("subject.type"),
        dataIndex: "type",
        key: "type",
        width: 150,
        editable: true,
      },
      {
        title: t("label.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 250,
        render: (value: any) =>
          value ? DateTime.fromISO(value).toFormat("HH:mm:ss dd/MM/yyyy") : "",
      },
      {
        title: t("label.updatedAt"),
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 250,
        render: (value: any) =>
          value ? DateTime.fromISO(value).toFormat("HH:mm:ss dd/MM/yyyy") : "",
      },
      {
        title: t("label.action"),
        width: 250,
        key: "action",
        render: (_: any, record: any) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Popconfirm
                title={t("label.confirmSave")}
                onConfirm={() => save(record)}
              >
                <img
                  src={CheckedIcon}
                  alt=""
                  className="cursor-pointer select-none mr-10 w-24"
                />
              </Popconfirm>

              <Popconfirm title={t("label.confirmCancel")} onConfirm={cancel}>
                <img
                  src={CloseIcon}
                  alt=""
                  className="cursor-pointer select-none mr-10 w-24"
                />
              </Popconfirm>
            </span>
          ) : (
            <>
              {!editingKey && (
                <>
                  <img
                    src={EditIcon}
                    alt=""
                    className="cursor-pointer select-none mr-10 w-24"
                    onClick={() => edit(record)}
                  />
                  <Popconfirm
                    title={t("label.confirmDelete")}
                    onConfirm={() => handleDelete(record)}
                  >
                    <img
                      src={DeleteIcon}
                      alt=""
                      className="cursor-pointer select-none mr-10 w-24"
                    />
                  </Popconfirm>
                </>
              )}
            </>
          );
        },
        align: "center",
      },
    ],
    [t, isEditing, edit, cancel, save, editingKey],
  );

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    setDataTable(
      subjectsData?.map((item: any) => ({ ...item, key: item._id })),
    );
  }, [subjectsData]);

  return (
    <div className={cx("container")}>
      {contextHolder}
      <div className="flex justify-between">
        <Typography.Title
          level={4}
          style={{ marginBottom: 16 }}
          className={cx("title")}
        >
          {t("subject.title")}
        </Typography.Title>
        <div className="flex align-center mb-10">
          <Button className="mr-10" onClick={addNewRow}>
            {t("subject.add")}
          </Button>
          <Dropdown.Button
            menu={{
              items: [
                {
                  label: (
                    <div className="px-10 py-10 my-5">Tải lên file excel</div>
                  ),
                  key: 2,
                  onClick: () => {
                    setOpenModal(true);
                  },
                },
                {
                  label: (
                    <div className="px-10 py-10 my-5">
                      Tải xuống file excel mẫu
                    </div>
                  ),
                  key: 3,
                  onClick: async () => {
                    const template =
                      "a-static-file/upload subjects example.csv";
                    const response = await getSignedUrls({
                      bucket: "attendance-resource",
                      files: [template],
                    });
                    response?.[template]
                      ? window.open(response?.[template], "_blank")
                      : notiApi.error({
                          message: "Lỗi",
                          description: "Không thể tải xuống file mẫu",
                        });
                  },
                },
              ],
            }}
            trigger={["click"]}
            className={cx("dropdown")}
            type="primary"
            icon={<img src={DownIcon} alt="" height="13" />}
          >
            <Space>Hành động</Space>
          </Dropdown.Button>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          bordered
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={dataTable || []}
          columns={mergedColumns}
          loading={isLoading}
          {...tableParams}
        />
      </Form>

      <Modal
        title={"Tải lên danh sách môn học từ file CSV"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <div>
          <UploadFile
            handleUpload={async file => {
              await batchCreateSubjects(file);
              setOpenModal(false);
              refetch();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
