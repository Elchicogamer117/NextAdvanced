import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const Chart = ({ charData }) => {
  return (
    <>
      <Bar
        data={charData}
        options={{
          title: {
            display: true,
            text: 'Category',
            fontSize: 20,
          },
          plugins: {
            legend: {
              display: false,
              position: 'right',
              // labels: {
              //   color: 'rgb(255, 99, 132)',
              // },
            },
          },
        }}
      />
    </>
  );
};
