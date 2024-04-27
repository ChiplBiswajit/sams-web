import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import Socketconfig from "@/src/utils/Socket/Socketconfig";

export default function RespiratoryGraph() {
  const [respdata, setrespdata] = useState<number[]>([]); // Specify number type for spo2Data
  const [labels, setLabels] = useState<string[]>([]); // Specify string type for labels

  useEffect(() => {
    Socketconfig.initializeSocket();
    Socketconfig.on("1234", (msg: any) => {
      const { patientData, patientId } = JSON.parse(msg);
      // console.log(patientData);
      if (patientId === "1234" && patientData && patientData?.respiratoryRate) {
        const { wave } = patientData.respiratoryRate;
        setrespdata((prevData) => [...prevData, wave]);
        setLabels((prevLabels) => [
          ...prevLabels,
          new Date().toLocaleTimeString(),
        ]);
      }
    });
  }, []);


  const RespiratoryGraph: ChartData<"line", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: "Respiratory Wave",
        data: respdata,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0, // Set pointRadius to 0 to hide the data points
      },
    ],
  };
  const RespiratoryGraphoptions = {
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
  return (
    <div>
      <div className="p-5 h-96 center flex flex-col w-full">
        <h2 className="font-bold py-3">Respiratory Graph</h2>
        <Line data={RespiratoryGraph} options={RespiratoryGraphoptions} />
      </div>
    </div>
  );
}