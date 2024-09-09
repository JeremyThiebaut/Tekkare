import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  month?: string;
  date?: string;
  name?: string;
  specialty?: string;
  value?: number;
  numberOfDoctors?: number;
}

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  title: string;
  data: ChartData[];
}

export default function Chart({ type, title, data }: ChartProps) {
  const chartData = {
    labels: Array.isArray(data)
      ? data.map(item => item.month || item.date || item.name || item.specialty)
      : Object.keys(data),
    datasets: [
      {
        label: title,
        data: Array.isArray(data)
          ? data.map(item => item.value || item.numberOfDoctors)
          : Object.values(data),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow p-6" style={{ height: '400px' }}>
      {type === 'line' ? (
        <Line options={options} data={chartData} />
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </div>
  )
}