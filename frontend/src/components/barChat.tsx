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
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Users by Local Government Area",
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

// Example dummy data (replace these numbers with actual values)
const dataset1 = [12, 5, 9, 7, 10, 15, 13, 18, 6, 4, 8, 11, 9, 5, 7, 10];
// const dataset2 = [8, 3, 6, 5, 9, 10, 12, 16, 4, 2, 7, 8, 6, 4, 5, 9];

export const data = {
  labels,
  datasets: [
    {
      label: "LGA",
      data: dataset1,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
   
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
