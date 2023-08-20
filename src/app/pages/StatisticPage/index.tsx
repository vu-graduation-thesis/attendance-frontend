import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
const cx = classNames.bind(styles);
export const StatisticPage = () => {

  return <div className={cx("container")}>
    <div className={cx("sumary", "flex", "flex-col", "align-center")}>
      <h3 className="bold mt-10">Lớp đang dạy</h3>
      <h3 className="text-center red bold text-28" >5</h3>

    </div>

    <div className={cx("barChartWrapper")}>
      <Bar
        data={{
          labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
          datasets: [
            {
              label: 'Tỉ lệ điểm danh',
              data: [100, 200, 150, 300, 250],
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        }}

      />

    </div>
  </div>;
};
