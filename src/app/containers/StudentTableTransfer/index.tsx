import { Space, Switch, Table, Tag, Transfer } from "antd";
import type { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import type { TransferItem, TransferProps } from "antd/es/transfer";
import difference from "lodash/difference";
import React, { useMemo, useState } from "react";

import { useGetStudents } from "core/queries/student.js";

interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

interface DataType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: DataType[];
  leftColumns: ColumnsType<DataType>;
  rightColumns: ColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string),
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns: ColumnsType<DataType> = [
  {
    dataIndex: "studentId",
    title: "Mã sinh viên",
  },
  {
    dataIndex: "name",
    title: "Họ tên",
  },
];

const rightTableColumns: ColumnsType<Pick<DataType, "studentId">> = [
  {
    dataIndex: "studentId",
    title: "Mã sinh viên",
  },
  {
    dataIndex: "name",
    title: "Họ tên",
  },
];

const StudentTableTransfer: React.FC = ({ onChange }: any) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const { data: studentsData } = useGetStudents();

  const studentsDataFormatted = useMemo(
    () =>
      studentsData?.map((student: any) => ({
        key: student?.student?._id,
        name: student?.student?.name,
        studentId: student?.student?.studentId,
      })) || [],
    [studentsData],
  );

  const handleChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    onChange(nextTargetKeys);
  };

  return (
    <>
      <TableTransfer
        dataSource={studentsDataFormatted}
        targetKeys={targetKeys}
        showSearch={true}
        onChange={handleChange}
        filterOption={(inputValue, item) =>
          item?.name?.toLowerCase()?.indexOf(inputValue?.toLowerCase()) !==
            -1 ||
          item?.studentId?.toLowerCase()?.indexOf(inputValue?.toLowerCase()) !==
            -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </>
  );
};

export default StudentTableTransfer;
