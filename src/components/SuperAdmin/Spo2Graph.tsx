import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Socketconfig from "@/src/utils/Socket/Socketconfig";

export default function Spo2Graph() {
  const MAX_DATA_POINTS = 1000; // Maximum number of data points to display

  const [spo2Data, setSpo2Data] = useState<number[]>([]); // Specify number type for spo2Data
  const [labels, setLabels] = useState<string[]>([]); // Specify string type for labels

  useEffect(() => {
    Socketconfig.initializeSocket();
    Socketconfig.on("1234", (msg: any) => {
      const { patientData, patientId } = JSON.parse(msg);
      if (patientId === "1234" && patientData && patientData?.spo2) {
        const { wave } = patientData.spo2;

        // Update data and labels
        setSpo2Data(prevData => {
          const updatedData = [...prevData, wave];
          // If data exceeds maximum limit, remove oldest data point
          if (updatedData.length > MAX_DATA_POINTS) {
            updatedData.shift(); // Remove the oldest data point
          }
          return updatedData;
        });

        setLabels(prevLabels => {
          const updatedLabels = [...prevLabels, new Date().toLocaleTimeString()];
          // If labels exceed maximum limit, remove oldest label
          if (updatedLabels.length > MAX_DATA_POINTS) {
            updatedLabels.shift(); // Remove the oldest label
          }
          return updatedLabels;
        });
      }
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        display: false,
        title: {
          display: true,
          text: "ECG Value",
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "SpO2 Wave",
        data: spo2Data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0, // Set pointRadius to 0 to hide the data points
      },
    ],
  };

  return (
    <div className="p-5 h-96 center flex flex-col w-full">
      <h2 className="font-bold py-3">SpO2 Graph</h2>
      <Line data={data} options={options} />
    </div>
  );
}
