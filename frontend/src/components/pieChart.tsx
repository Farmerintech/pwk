import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
      labels: ['Male', 'Female', ],

  datasets: [
    {
      label: 'Registered Users By Gender',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],

};
export const options = {
  responsive: true,
    maintainAspectRatio: false, // ✅ allows height control via container

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Users by Gender",
    },
  },
};
export function PieChart() {
  return <Pie data={data} options={options}/>;
}
