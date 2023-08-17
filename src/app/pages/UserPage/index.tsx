import { Button, Popconfirm, Table, Typography, message } from "antd";
import classNames from "classnames/bind";
import { DEFAULT_CURRENT_PAGE_START_WHITH_1, DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION } from "core/constants";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);
export const UserPage = () => {
  const { t } = useTranslation();

  const [searchParams,] = useSearchParams();

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
        // total: {data}?.total || DEFAULT_PAGINATION.TOTAL,
      },
    }),
    [pagination],
  );

  const columns: any = useMemo(
    () => [
      {
        title: t("user.email"),
        dataIndex: "email",
        key: "email",
        width: 250,
      },
      {
        title: t("user.name"),
        dataIndex: "name",
        key: "name",
        width: 250,
      },
      {
        title: t("user.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 250,
        render: value =>
          DateTime.fromISO(value).toFormat("HH:mm:ss dd/MM/yyyy"),
      },
      {
        title: t("user.action"),
        width: 250,
        render: (record: any) => (
          <Popconfirm
            title={t("common.areYouSure")}
            okText={t("common.yes")}
            cancelText={t("common.no")}
            onConfirm={async () => {
              message.success(t("common.message.deleteSuccess"));
            }}
          >
            <Button type="link">{t("button.delete")}</Button>
          </Popconfirm>
        ),
      },
    ],
    [t],
  );

  return <div className={cx("container")}>
    <Typography.Title level={4} style={{ marginBottom: 16 }} className={cx("title")}>
      {t("user.title")}
    </Typography.Title>
    <Table
      bordered
      dataSource={[]}
      columns={columns}
      loading={false}
      onChange={() => { }}
      {...tableParams}
    />
  </div>;
};
