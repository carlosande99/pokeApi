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

let beneficios = ['hola', 'hola2']
let meses = ['hola3', 'hola4']

let midata = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Etiquetas del eje X
  datasets: [
    {
      label: 'Ventas 2025', // Leyenda del dataset
      data: [12, 19, 3, 5, 2, 3], // Valores de las barras
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de las barras
    },
    {
      label: 'Ventas 2024',
      data: [9, 15, 8, 4, 7, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

let mioptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Ventas Mensuales - Gráfico de Barras',
    },
  },
};

export default function LinesChart(){
  return <Bar data={midata} options={mioptions}/>
};
