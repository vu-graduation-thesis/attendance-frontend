import { Breadcrumb, Button, Table, Typography } from "antd";
import classNames from "classnames/bind";
import { DEFAULT_CURRENT_PAGE_START_WHITH_1, DEFAULT_PAGE_SIZE } from "core/constants";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon"
import IntoIcon from "core/assets/images/into.png"
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);


export const ClassManagementPage = () => {
  const { id } = useParams();
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
        title: t("class.id"),
        dataIndex: "id",
        key: "id",
        width: 250,
      },
      {
        title: t("class.subject"),
        dataIndex: "subject",
        key: "subject",
        width: 250,
      },
      {
        title: t("class.credit"),
        dataIndex: "credit",
        key: "credit",
        width: 150,
      },
      {
        title: t("class.teaching_schedule"),
        dataIndex: "teaching_schedule",
        key: "teaching_schedule",
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
        title: t("class.see"),
        width: 250,
        render: () => (
          <img src={IntoIcon} alt="" className="cursor-pointer select-none" />
        ),
        align: "center"
      },
    ],
    [t],
  );

  return <div className={cx("container")}>
    {id ? <>
      <Breadcrumb items={[{ title: 'sample' }, { title: "Lop AA93.FJS.39849" }]} className="mb-10" />
    </> : (
      <>
        <div className="flex justify-between">
          <Typography.Title level={4} style={{ marginBottom: 16 }} className={cx("title")}>
            {t("class.title")}
          </Typography.Title>
          <Button type="primary">{t("class.syncCtmsData")}</Button>
        </div>
        <Table
          bordered
          dataSource={[{}]}
          columns={columns}
          loading={false}
          onChange={() => { }}
          {...tableParams}
        />
      </>

    )}

  </div>;
};
