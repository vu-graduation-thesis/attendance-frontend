import { Select } from "antd";
import { Chart as ChartJS, registerables } from "chart.js";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { BarChart } from "core/app/components/BarChart/index.js";
import { HorizontalBarChart } from "core/app/components/HorizontalBarChart/index.js";
import { StackedChart } from "core/app/components/StackedChart/index.js";
import { useGetClasses } from "core/queries/class.ts";
import {
  useCountAttendanceByType,
  useStatisticStudentsVerified,
  useStatisticsClassAttendanceStatus,
} from "core/queries/statistic.js";
import { useGetTeachers } from "core/queries/teacher.ts";

import styles from "./styles.module.scss";

ChartJS.register(...registerables);
const cx = classNames.bind(styles);
export const StatisticPage = () => {
  const [selectedClass, setSelectedClass] = useState<string>();
  const [selectedTeacher, setSelectedTeacher] = useState<string>();
  const { data: classesData } = useGetClasses({});
  const { data: teachersData } = useGetTeachers();

  const { data: classAttendanceStatus } = useStatisticsClassAttendanceStatus({
    classId: selectedClass,
  });

  const { data: countAttendanceByType } = useCountAttendanceByType();

  const { data: studentsVerified } = useStatisticStudentsVerified();

  const classAttendanceStatusData = {
    labels: classAttendanceStatus?.map(
      (_, index: number) => `Buổi ${index + 1}`,
    ),
    datasets: [
      {
        label: "Điểm danh bằng AI",
        data: classAttendanceStatus?.map(value => value?.aiDetected),
        backgroundColor: "#7bc043",
      },
      {
        label: "Điểm danh thủ công",
        data: classAttendanceStatus?.map(value => value?.manual),
        backgroundColor: "#f37736",
      },
      {
        label: "Sinh viên nghỉ",
        data: classAttendanceStatus?.map(value => value?.absent),
        backgroundColor: "#e6e6ea",
      },
    ],
  };

  useEffect(() => {
    if (classesData?.length) {
      setSelectedClass(classesData[0]._id);
    }
  }, [classesData]);

  useEffect(() => {
    if (teachersData?.length) {
      setSelectedTeacher(teachersData[0]._id);
    }
  }, [teachersData]);

  return (
    <div className={cx("container")}>
      <div className="flex justify-center">
        <div className={cx("sumary", "flex", "flex-col", "align-center")}>
          <h3 className="bold mt-10">
            Sinh viên đã cung cấp <br /> dữ liệu khuôn mặt
          </h3>
          {studentsVerified && (
            <h3 className="text-center red bold text-28">{`${studentsVerified?.verified} / ${studentsVerified?.total}`}</h3>
          )}
        </div>
        <div className={cx("sumary", "flex", "flex-col", "align-center")}>
          <h3 className="bold mt-10">Tỉ lệ điểm danh bằng AI</h3>
          <h3 className="text-center red bold text-28">
            {countAttendanceByType
              ? (
                  (countAttendanceByType?.aiDetectedCount * 100) /
                    countAttendanceByType?.all || 0
                ).toFixed(2)
              : 0}{" "}
            %
          </h3>
        </div>
        {/* <div className={cx("sumary", "flex", "flex-col", "align-center")}>
          <h3 className="bold mt-10">
            Tỉ lệ trung bình <br /> đi học của toàn sinh viên
          </h3>
          <h3 className="text-center red bold text-28">5</h3>
        </div> */}
      </div>
      <div className="flex w-full flex-end align-center mt-30">
        <h3 className="bold mt-10 mr-20 ">Chọn lớp</h3>

        <Select
          value={selectedClass}
          style={{ width: "", minWidth: "300px" }}
          options={classesData?.map((value: any) => ({
            label: value.name,
            value: value._id,
          }))}
          onChange={value => setSelectedClass(value)}
          defaultActiveFirstOption
        />
      </div>
      <div className={cx("barChartWrapper")}>
        <div
          className="flex justify-center"
          style={{
            width: "100%",
            height: "500px",
            marginBottom: "50px",
          }}
        >
          <StackedChart configs={classAttendanceStatusData} />
        </div>

        <div className="flex w-full flex-end align-center mt-30">
          <h3 className="bold mt-10 mr-20 ">Chọn giảng viên</h3>

          <Select
            value={selectedClass}
            style={{ width: "", minWidth: "300px" }}
            options={classesData?.map((value: any) => ({
              label: value.name,
              value: value._id,
            }))}
            onChange={value => setSelectedClass(value)}
            defaultActiveFirstOption
          />
        </div>
        <div
          className="flex justify-center"
          style={{
            width: "100%",
            height: "500px",
            marginBottom: "50px",
          }}
        >
          {/* <BarChart /> */}
        </div>

        {/* <HorizontalBarChart /> */}
      </div>
    </div>
  );
};
