import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import Socketconfig from "@/src/utils/Socket/Socketconfig";


const MAX_DATA_POINTS = 100; // Define the maximum number of data points to keep


export default function EcgGraph() {
  const [ecgdata, setecgdata] = useState<number[]>([]); // Specify number type for spo2Data
  const [ecgdata2, setecgdata2] = useState<number[]>([]); // Specify number type for spo2Data
  const [ecgdata3, setecgdata3] = useState<number[]>([]); // Specify number type for spo2Data
  const [labels, setLabels] = useState<string[]>([]); // Specify string type for labels

  useEffect(() => {
    Socketconfig.initializeSocket();
    Socketconfig.on("1234", (msg: any) => {
      const { patientData, patientId } = JSON.parse(msg);
      // console.log("hiiiiiiiiiiiiiiiiiii",patientData);
      if (patientId === "1234" && patientData && patientData?.ecg?.wave1) {
        const { wave1 } = patientData?.ecg;
        // console.log("wave1", wave1);
        setecgdata(prevData => {
          const newData = [...prevData, wave1];
          return newData.length > MAX_DATA_POINTS ? newData.slice(-MAX_DATA_POINTS) : newData;
        });      }
      if (patientId === "1234" && patientData && patientData?.ecg?.wave2) {
        const { wave2 } = patientData?.ecg;
        // console.log("wave2", wave2);
        setecgdata2((prevData) => [...prevData, wave2]);
      }
      if (patientId === "1234" && patientData && patientData?.ecg?.wave3) {
        const { wave3 } = patientData?.ecg;
        // console.log("wave3", wave3);
        setecgdata3((prevData) => [...prevData, wave3]);
      }
    });
  }, []);

  // Sample data
  const wave1: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [
      {
        label: "ECG Wave1",
        data: ecgdata,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0, // Set pointRadius to 0 to hide the data points
      },
    ],
  };
  const Wave1options = {
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

  const wave2: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [
      {
        label: "ECG Wave2",
        data: ecgdata2,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0, // Set pointRadius to 0 to hide the data points
      },
    ],
  };
  const Wave2options = {
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

  const wave3: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [
      {
        label: "ECG Wave3",
        data: ecgdata3,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0, // Set pointRadius to 0 to hide the data points
      },
    ],
  };
  const Wave3options = {
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


  console.log("wave1", ecgdata);

  return (
    <>
      <div className="p-5 h-96 center flex flex-col w-full">
        <h2 className="font-bold py-3">EcgGraph wave1</h2>
        <Line data={wave1} options={Wave1options} />
      </div>
      <div className="p-5 h-96 center flex flex-col w-full">
        <h2 className="font-bold py-3">EcgGraph wave2</h2>
        <Line data={wave2} options={Wave2options}/>
      </div>
      <div className="p-5 h-96 center flex flex-col w-full">
        <h2 className="font-bold py-3">EcgGraph wave3</h2>
        <Line data={wave3} options={Wave3options}/>
      </div>
    </>
  );
}
