import React, { useEffect, useState } from "react";
import {
  Chart,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  LineElement, // Add LineElement to the registered elements
  // PolarAreaElement,
  // Add PolarAreaElement to the registered elements
  RadialLinearScale, // Add RadialLinearScale for polar charts
  DoughnutController, // Add DoughnutController for the donut chart
} from "chart.js";
import { Line } from "react-chartjs-2";
import socketServcies from "@/src/utils/Socket/socketService";

Chart.register(
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, // Register LineElement
  // PolarAreaElement, // Register PolarAreaElement
  RadialLinearScale, // Register RadialLinearScale
  DoughnutController // Register DoughnutController
);
// Sample heart rate data
const sampleJerkValueData = [
  { timestamp: 0, jerkValue: 0 },
  { timestamp: 1, jerkValue: 2 },
  { timestamp: 2, jerkValue: 4 },
  { timestamp: 3, jerkValue: 15 },
  { timestamp: 4, jerkValue: 20 },
  { timestamp: 5, jerkValue: 60 },
  { timestamp: 6, jerkValue: 10 },
  { timestamp: 7, jerkValue: 60 },
  { timestamp: 8, jerkValue: 75 },
  { timestamp: 9, jerkValue: 21 },
  { timestamp: 10, jerkValue: 8 },
];

const [res, setRes] = useState([0.9, 1, 0.9, 0.9]);
useEffect(() => {
  socketServcies.initializeSocket();
  socketServcies.on("received_message", (msg: any) => {
    console.log(
      "4444444444444444444444444444444444444444444444444444",
      msg?.alcohol[0]?.jerkValue
    );
    setRes(JSON.parse(msg?.alcohol[0]?.jerkValue));
  });
}, []);

export default function SAJerkdata() {
  const [jerkValueData, setJerkValueData] = useState(sampleJerkValueData);

  return (
    <div className="w-full mt-8 h-auto rounded-lg shadow-2xl  p-2">
      <div className="">
        <Line
          data={{
            labels: jerkValueData.map((entry) => entry.timestamp),
            datasets: [
              {
                label: "Jerk Value",
                data: jerkValueData.map((entry) => entry.jerkValue),
                borderColor: "rgba(255, 0, 0, 1)", // Red color for jerk value line
                borderWidth: 1,
                pointRadius: 3, // Adjust the point radius as needed
                fill: true,
                backgroundColor: "rgba(255, 0, 0, 1)", // Transparent fill color
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                min: 0,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
