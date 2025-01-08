import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function BarChart({stats}){
  let midata = {
    labels: ['PS', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'], // Etiquetas del eje X
    datasets: [
      {
        label: '', 
        data: stats || [0,0,0,0,0,0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Color para PS
          'rgba(54, 162, 235, 0.6)', // Color para Ataque
          'rgba(255, 206, 86, 0.6)', // Color para Defensa
          'rgba(75, 192, 192, 0.6)', // Color para Ataque Especial
          'rgba(153, 102, 255, 0.6)', // Color para Defensa Especial
          'rgba(255, 159, 64, 0.6)', // Color para Velocidad
        ],
      },
    ],
  };

  let mioptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <div style={{ width: '95%'}}>
      <Bar data={midata} options={mioptions} />
    </div>
  );
};
