import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import faker from "faker";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Tỉ lệ điểm danh theo lớp học phần",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function StackedChart({ configs }) {
  console.log(configs);
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Tỉ lệ điểm danh theo lớp học phần",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return configs?.datasets && <Bar options={options} data={configs} />;
}
