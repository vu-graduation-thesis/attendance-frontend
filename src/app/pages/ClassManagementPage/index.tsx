import { Button, Modal, Popconfirm, Table, Typography } from "antd";
import classNames from "classnames/bind";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import DeleteIcon from "core/assets/images/delete.png";
import EditIcon from "core/assets/images/edit.png";
import EyeIcon from "core/assets/images/eye.png";
import DownloadIcon from "core/assets/images/file.png";
import configs from "core/configs/index.js";
import {
  DEFAULT_CURRENT_PAGE_START_WHITH_1,
  DEFAULT_PAGE_SIZE,
} from "core/constants";
import PERMISSIONS from "core/constants/user.ts";
import { useGetClasses, useUpdateClass } from "core/queries/class.js";
import { useGetUserInfo } from "core/queries/user.ts";
import { routeConfig } from "core/routes/routeConfig.js";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const ClassManagementPage = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(true);
  const { data: userInfo } = useGetUserInfo();
  const { data: classesData, refetch } = useGetClasses({});
  const { mutateAsync: updateClass } = useUpdateClass();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const classesFormatted = useMemo(() => {
    if (userInfo?.role === PERMISSIONS.TEACHER) {
      return classesData?.filter(
        (item: any) => item?.teacher?._id === userInfo?.teacher?._id,
      );
    }

    return classesData;
  }, [classesData, userInfo]);

  const pagination = useMemo(
    () => ({
      currentPage:
        Number(searchParams.get("currentPage")) ||
        DEFAULT_CURRENT_PAGE_START_WHITH_1,
      pageSize: Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE,
    }),
    [searchParams],
  );

  const handleDelete = async (record: any) => {
    try {
      await updateClass({ id: record?._id, isDeleted: true } as any);
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (record: any) => {
    navigate(`/class-management/edit/${record?._id}`);
  };

  const tableParams = useMemo(
    () => ({
      pagination: {
        ...pagination,
        // total: {data}?.total || DEFAULT_PAGINATION.TOTAL,
      },
    }),
    [pagination],
  );

  const columns: any = useMemo(
    () => [
      {
        title: t("class.id"),
        dataIndex: "_id",
        key: "_id",
        width: 250,
      },
      {
        title: t("class.teacher"),
        dataIndex: ["teacher", "name"],
        key: ["teacher", "name"],
        width: 250,
      },
      {
        title: t("class.subject"),
        dataIndex: "name",
        key: "name",
        width: 250,
      },
      {
        title: t("class.credit"),
        dataIndex: "numberOfCredits",
        key: "numberOfCredits",
        width: 150,
      },
      {
        title: t("class.teaching_schedule"),
        dataIndex: "lessonSchedules",
        key: "lessonSchedules",
        width: 250,
        render: (value: any) => {
          return value?.map((item: any) => {
            return (
              <>
                {item?.startDay && (
                  <div>
                    {`Thứ ${
                      DateTime.fromFormat(item?.startDay, "dd/mm/yyyy").weekday
                    } hàng tuần, từ 
                  ${item?.startDay || ""}`}
                  </div>
                )}
              </>
            );
          });
        },
      },
      {
        title: t("class.totalNumberOfLessons"),
        dataIndex: "totalNumberOfLessons",
        key: "totalNumberOfLessons",
        width: 250,
      },
      {
        title: t("class.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 250,
        render: (value: any) =>
          DateTime.fromISO(value).toFormat("HH:mm:ss dd/MM/yyyy"),
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
        width: userInfo?.role === PERMISSIONS.ADMIN ? 250 : 150,
        key: "action",
        render: (_: any, record: any) => (
          <div className="flex justify-between">
            {userInfo?.role === PERMISSIONS.ADMIN && (
              <>
                <img
                  src={EditIcon}
                  alt=""
                  className="cursor-pointer select-none w-24"
                  onClick={() => handleEdit(record)}
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
              </>
            )}
            <img
              src={EyeIcon}
              alt=""
              className="cursor-pointer select-none w-24"
              onClick={() => {}}
            />
            <img
              src={DownloadIcon}
              alt=""
              className="cursor-pointer select-none w-24"
              onClick={() => {
                window.open(
                  `${configs.apiEndpoint}/classes/${record?._id}/export`,
                  "_blank",
                );
              }}
            />
          </div>
        ),
        align: "center",
      },
    ],
    [t],
  );

  return (
    <div className={cx("container")}>
      <div className="flex justify-between">
        <Typography.Title
          level={4}
          style={{ marginBottom: 16 }}
          className={cx("title")}
        >
          {t("class.title")}
        </Typography.Title>
        {userInfo?.role === PERMISSIONS.ADMIN && (
          <Button type="primary" onClick={() => navigate(routeConfig.addClass)}>
            {t("class.add")}
          </Button>
        )}
      </div>
      <Table
        bordered
        dataSource={classesFormatted || []}
        columns={columns}
        loading={false}
        onChange={() => {}}
        {...tableParams}
      />
    </div>
  );
};
