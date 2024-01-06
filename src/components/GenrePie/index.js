import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function GenrePie({ items }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const topGenres = items.slice(0, 14);
  const otherCount = items
    .slice(10)
    .reduce((total, genre) => total + genre.count, 0);

  const chartData = {
    labels: [...topGenres.map((genre) => genre.genre), "Other"],
    datasets: [
      {
        data: [...topGenres.map((genre) => genre.count), otherCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(128, 128, 128, 0.6)", // "Other" color
        ],
      },
    ],
  };
  return (
    <div>
      <h2>Top 10 Genres</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default GenrePie;
