import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Users by Local Government Area",
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        maxRotation:75,
        minRotation: 75,
      },
      // Make bars thinner by controlling spacing
      categoryPercentage: 0.2, // default 0.8, smaller = thinner bars
      barPercentage: 0.2,      // default 0.9, smaller = thinner bars
    },
  },
};

const labels = [
  "Asa",
  "Baruten",
  "Edu",
  "Ekiti",
  "Ifelodun",
  "Ilorin East",
  "Ilorin South",
  "Ilorin West",
  "Irepodun",
  "Isin",
  "Kaiama",
  "Moro",
  "Offa",
  "Oke-ero",
  "Oyun",
  "Patigi",
];

const dataset1 = [12, 5, 9, 7, 10, 15, 13, 18, 6, 4, 8, 11, 9, 5, 7, 10];

export const data = {
  labels,
  datasets: [
    {
      label: "Number of Users",
      data: dataset1,
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderWidth: 0.2,
    },
  ],
};

export function BarChart() {
  return (
        <Bar data={data} options={options} />
  );
}
