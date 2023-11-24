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
import dayjs from "dayjs";
import { DateTime } from "luxon";
import moment from "moment";
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
import EyeIcon from "core/assets/images/eye.png";
import MailIcon from "core/assets/images/sending.png";
import {
  DEFAULT_CURRENT_PAGE_START_WHITH_1,
  DEFAULT_PAGE_SIZE,
} from "core/constants";
import { ADD_PREFIX, EXISTED_ERROR_CODE } from "core/constants/common.ts";
import { useGetSignedUrls } from "core/mutations/file.js";
import { useSendMail } from "core/mutations/mail.js";
import { useBatchCreateStudent } from "core/mutations/student.js";
import { useCreateStudent, useUpdateStudent } from "core/mutations/student.ts";
import { useGetStudents } from "core/queries/student.ts";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const StudentManagementPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"mail" | "upload">("mail");
  const { data: studentsData, isLoading, refetch } = useGetStudents();
  const { mutateAsync: updateStudent } = useUpdateStudent();
  const { mutateAsync: createStudent } = useCreateStudent();
  const { mutateAsync: sendMail } = useSendMail();
  const [notiApi, contextHolder] = notification.useNotification();
  const { mutateAsync: batchCreateStudents } = useBatchCreateStudent();
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
      phone: "",
      email: "",
      username: "",
    };
    form.setFieldsValue({ ...newData });
    setEditingKey(newData._id);
    setDataTable([newData, ...dataTable]);
  };

  const edit = (record: any) => {
    if (editingKey.includes(ADD_PREFIX)) {
      setDataTable(dataTable.filter((item: any) => item._id !== editingKey));
    }
    record.student.birthday = record?.student?.birthday
      ? dayjs(record?.student?.birthday)
      : dayjs("2000-01-01T11:42:28.423Z");
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
      await updateStudent({ id: record?._id, isDeleted: true });
      refetch();
      notiApi.success({
        message: t("app.success"),
        description: t("app.deleteSuccess"),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const save = async (record: any) => {
    try {
      const row = await form.validateFields();
      console.log("row", row, record);
      if (editingKey.includes(ADD_PREFIX)) {
        await createStudent(row);
      } else {
        await updateStudent({ id: record?._id, ...row });
      }
      setEditingKey("");
      form.resetFields();
      refetch();
      notiApi.success({
        message: t("app.success"),
        description: t("app.saveSuccess"),
      });
    } catch (errInfo) {
      if (
        (errInfo as any)?.response?.data?.error?.code === EXISTED_ERROR_CODE
      ) {
        const errorData = (errInfo as any)?.response?.data?.error?.data || {};
        Object.keys(errorData)?.forEach(key => {
          if (!!errorData?.[key]) {
            form.setFields([
              {
                name: key,
                errors: [t(`student.${key}Existed`)],
              },
            ]);
          }
        });
        notiApi.error({
          message: t("app.error"),
          description: t("app.saveError"),
        });
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
        title: t("student.name"),
        dataIndex: ["student", "name"],
        key: ["student", "name"],
        width: 250,
        editable: true,
      },
      {
        title: t("student.studentId"),
        dataIndex: ["student", "studentId"],
        key: ["student", "studentId"],
        width: 150,
        editable: true,
      },
      {
        title: t("student.phone"),
        dataIndex: "phone",
        key: "phone",
        width: 150,
        editable: true,
      },
      {
        title: t("student.birthday"),
        dataIndex: ["student", "birthday"],
        key: ["student", "birthday"],
        width: 250,
        editable: true,
        render: (value: any) => value && moment(value).format("DD/MM/YYYY"),
        inputType: "date",
      },
      {
        title: t("student.email"),
        dataIndex: "email",
        key: "email",
        width: 250,
        editable: true,
      },

      {
        title: t("student.status"),
        dataIndex: ["student", "verified"],
        key: ["student", "verified"],
        width: 250,
        render: (value: any) =>
          value ? (
            <span className="text-green">{t("student.verified")}</span>
          ) : (
            <span className="text-red">{t("student.unverified")}</span>
          ),
      },
      {
        title: t("student.username"),
        dataIndex: "username",
        key: "username",
        width: 150,
        editable: editingKey.includes(ADD_PREFIX) ? true : false,
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
        width: 150,
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
                <div className="flex justify-between">
                  <img
                    src={EditIcon}
                    alt=""
                    className="cursor-pointer select-none w-24"
                    onClick={() => edit(record)}
                  />
                  <Popconfirm
                    title={t("label.confirmDelete")}
                    onConfirm={() => handleDelete(record)}
                  >
                    <img
                      src={DeleteIcon}
                      alt=""
                      className="cursor-pointer select-none w-24"
                    />
                  </Popconfirm>
                </div>
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
        inputType: col.inputType || "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    setDataTable(
      studentsData?.map((item: any) => ({ ...item, key: item._id })),
    );
  }, [studentsData]);

  return (
    <div className={cx("container")}>
      {contextHolder}
      <div className="flex justify-between">
        <Typography.Title
          level={4}
          style={{ marginBottom: 16 }}
          className={cx("title")}
        >
          {t("student.title")}
        </Typography.Title>
        <div className="flex align-center mb-10">
          <Button className="mr-10" onClick={addNewRow}>
            {t("student.add")}
          </Button>
          <Dropdown.Button
            menu={{
              items: [
                {
                  label: (
                    <div className="px-10 py-10 my-5">
                      {t("common.sendMailVerify")}
                    </div>
                  ),
                  key: 1,
                  onClick: () => {
                    setOpenModal(true);
                    setModalType("mail");
                  },
                },
                {
                  label: (
                    <div className="px-10 py-10 my-5">
                      {t("common.uploadFileExcel")}
                    </div>
                  ),
                  key: 2,
                  onClick: () => {
                    setOpenModal(true);
                    setModalType("upload");
                  },
                },
                {
                  label: (
                    <div className="px-10 py-10 my-5">
                      {t("common.downloadExcel")}
                    </div>
                  ),
                  key: 3,
                  onClick: async () => {
                    const template =
                      "a-static-file/upload students example.csv";
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
            <Space>{t("common.action")}</Space>
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
        title={
          modalType === "mail"
            ? t("common.sendMailVerify")
            : t("student.uploadFile")
        }
        open={openModal}
        onOk={async () => {
          if (modalType === "mail") {
            await sendMail({
              recipients: studentsData?.reduce((acc: any, curr: any) => {
                if (!curr?.student?.verified) {
                  acc.push(curr?.email);
                }
                return acc;
              }, [] as any),
              mailType: "collect_face",
            });

            setOpenModal(false);
            notiApi.success({
              message: "Thành công",
              description: `Đã gửi mail thành công`,
            });
          }
        }}
        onCancel={() => setOpenModal(false)}
        footer={modalType === "mail" ? undefined : null}
      >
        {modalType === "mail" ? (
          <div>
            {t("common.confirmSend")}
            <b className="text-red">
              {studentsData?.reduce(
                (acc: any, curr: any) =>
                  (curr?.student?.verified ? 0 : 1) + acc,
                0,
              )}{" "}
              {t("common.student")}
            </b>
            {t("common.hasNotVerified")}
          </div>
        ) : modalType === "upload" ? (
          <div>
            <UploadFile
              handleUpload={async file => {
                await batchCreateStudents(file);
                setOpenModal(false);
                refetch();
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};
