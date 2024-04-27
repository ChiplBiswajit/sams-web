import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import socketServcies from "@/src/utils/Socket/socketService";

export default function SAJerkdata() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    socketServcies.initializeSocket();
    socketServcies.on("received_message", (msg: any) => {
      // console.log("Jerk Value response:::::::::::::::", msg?.alcohol[0]?.jerkValue);
      setRes(JSON.parse(msg?.alcohol[0]?.jerkValue));
    });
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const chartData = [
    ["Time", "Jerk"],
    ...(Array.isArray(res) ? res.map((value, index) => [getCurrentTime(), value]) : []),
  ];
  

  return (
    <div className="h-[80vh] w-full bg-[#8B95E3] p-1 rounded-md">
      <h1 className="text-xl text-center py-1 text-white font-bold w-full underline-offset-2 ">
        Jerk Graph
      </h1>
      <Chart
        // className="p-5"
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          hAxis: {
            title: "Time",
          },
          vAxis: {
            title: "Jerk",
          },
          chartArea: { width: "70%", height: "70%" },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
