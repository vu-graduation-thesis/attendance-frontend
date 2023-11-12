import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export const BarChart = () => {
  return (
    <Bar
      options={{
        plugins: {
          title: {
            display: true,
            text: "Tỉ lệ đi học của sinh viên theo lớp học",
          },
        },
      }}
      data={{
        labels: ["Môn 1", "Môn 2", "Môn 3", "Môn 4", "Môn 5"],
        datasets: [
          {
            label: "Tỉ lệ điểm danh",
            data: [100, 200, 150, 300, 250],
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
