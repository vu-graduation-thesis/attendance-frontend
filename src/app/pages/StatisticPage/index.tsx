import { Chart as ChartJS, registerables } from "chart.js";
import classNames from "classnames/bind";

import { BarChart } from "core/app/components/BarChart/index.js";
import { HorizontalBarChart } from "core/app/components/HorizontalBarChart/index.js";
import { StackedChart } from "core/app/components/StackedChart/index.js";
import {
  useStatisticStudentsVerified,
  useStatisticsClassAttendanceStatus,
} from "core/queries/statistic.js";

import styles from "./styles.module.scss";

ChartJS.register(...registerables);
const cx = classNames.bind(styles);
export const StatisticPage = () => {
  const { data: classAttendanceStatus } = useStatisticsClassAttendanceStatus({
    classId: "6547e35438120d0e44132392",
  });

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

  return (
    <div className={cx("container")}>
      <div className="flex justify-between">
        <div className={cx("sumary", "flex", "flex-col", "align-center")}>
          <h3 className="bold mt-10">
            Sinh viên đã cung cấp <br /> dữ liệu khuôn mặt
          </h3>
          <h3 className="text-center red bold text-28">{`${studentsVerified?.verified} / ${studentsVerified?.total}`}</h3>
        </div>
        <div className={cx("sumary", "flex", "flex-col", "align-center")}>
          <h3 className="bold mt-10">Tỉ lệ điểm danh bằng AI</h3>
          <h3 className="text-center red bold text-28">5</h3>
        </div>
        <div className={cx("sumary", "flex", "flex-col", "align-center")}>
          <h3 className="bold mt-10">
            Tỉ lệ trung bình <br /> đi học của toàn sinh viên
          </h3>
          <h3 className="text-center red bold text-28">5</h3>
        </div>
      </div>

      <div className={cx("barChartWrapper")}>
        <StackedChart configs={classAttendanceStatusData} />

        <BarChart />

        <HorizontalBarChart />
      </div>
    </div>
  );
};
