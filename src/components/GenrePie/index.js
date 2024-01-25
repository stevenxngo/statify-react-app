import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./styles.css";

function GenrePie({ items }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const topGenres = items.slice(0, 14);

  const chartData = {
    labels: [...topGenres.map((genre) => genre.genre)],
    datasets: [
      {
        label: '# of Artists',
        data: [...topGenres.map((genre) => genre.count)],
        backgroundColor: [
          "#ffa600",
          "#ff6361",
          "#bc5090",
          "#58508d",
          "#003f5c",
          "#ff7c43",
          "#ffbb00",
          "#ff005e",
          "#8338ec",
          "#3a86ff",
          "#8ac926",
          "#ff2e63",
          "#ffcc29",
          "#d90429",
          "#2F4F4F",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          maxWidth: 150,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        options={options}
        className="d-flex "
        width={600}
        height={600}
      />
    </div>
  );
}

export default GenrePie;
