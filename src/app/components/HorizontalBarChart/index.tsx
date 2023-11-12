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
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Top 5 giảng viên có tỉ lệ điểm danh cao nhất",
    },
  },
};

const labels = [
  "Giảng viên A",
  "Giảng viên A",
  "Giảng viên A",
  "Giảng viên A",
  "Giảng viên A",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Tỉ lệ tính theo phần trắm",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function HorizontalBarChart() {
  return <Bar options={options} data={data} />;
}
