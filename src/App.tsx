import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "./App.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function App() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const optionsList = [
    "We will eat dinner as a family.",
    "We will engage in at least one activity as a family every day.",
    "We will sit together to share stories or memories as a family.",
    "We will gather together for family discussions or games.",
  ];

  const handleClick = (index: number) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const data = {
    labels: ["Option 1", "Option 2", "Option 3", "Option 4"],
    datasets: [
      {
        label: "Responses",
        data: counts,
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24"],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#333",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#444", font: { size: 14 } },
      },
      x: {
        ticks: { color: "#444", font: { size: 14 } },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="kahoot-container">
      <header className="App-header">
        What will you as a family do to unite amongst yourselves?
      </header>

      <div className="options-grid">
        {optionsList.map((opt, i) => (
          <div
            key={i}
            className={`Option Option${i + 1}`}
            onClick={() => handleClick(i)}
          >
            {opt}
          </div>
        ))}
      </div>

      <div className="results-section">
        <h3 className="chart-title">Live Response Results</h3>
        <div className="chart-container">
          <Bar data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
