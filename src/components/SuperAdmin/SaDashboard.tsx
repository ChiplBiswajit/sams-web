import React, { useEffect } from "react";
import { fleets } from "@/src/assets/SuperAdmin/Sidebar/Index";
import {
  activedevices,
  fleetadmins,
  installdevices,
  production,
  revenue,
  warehouse,
} from "@/src/assets/SuperAdmin/dashboard";
import { MdInsights } from "react-icons/md";
import { Bar, Line, PolarArea, Doughnut } from "react-chartjs-2";
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
export default function SADashboard() {
  const donutData = {
    labels: ["All Devices", "Active", "Inactive"],
    datasets: [
      {
        label: "Total devices",
        data: [15, 5, 10],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(0, 255, 0)",
          "rgb(255, 0, 0)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  const polarData2 = {
    labels: ["Production ", " Refurbished"],
    datasets: [
      {
        label: "Polar Area Chart",
        data: [77, 0],
        backgroundColor: [
          "rgba(0, 255, 0, 0.5)", // Green for Active
          "rgba(255, 0, 0, 0.5)", // Red for Inactive
        ],
        borderColor: [
          "rgba(0, 255, 0, 1)", // Green for Active
          "rgba(255, 0, 0, 1)", // Red for Inactive
        ],
        borderWidth: 1,
      },
    ],
  };

  const polarOptions = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 30,
      },
    },
  };

  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [18000, 317000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: ["January", "February", "March", "April", "May"],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const bardata = {
    labels: [""],
    datasets: [
      {
        label: "Total device in stock",
        data: [15],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "january",
        data: [0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "february",
        data: [8],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
      {
        label: "march",
        data: [0],
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        borderColor: "rgb(255, 205, 86)",
        borderWidth: 1,
      },
      {
        label: "april",
        data: [0],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
      {
        label: "may",
        data: [0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "june",
        data: [0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "july",
        data: [0],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
      {
        label: "august",
        data: [0],
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        borderColor: "rgb(255, 205, 86)",
        borderWidth: 1,
      },
      {
        label: "september",
        data: [0],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
      {
        label: "october",
        data: [0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "november",
        data: [0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "december",
        data: [0],
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        borderColor: "rgb(255, 205, 86)",
        borderWidth: 1,
      },
      // Add more datasets as needed
    ],
  };

  return (
    <section className="w-full h-full bg-[#EEF1FC] ">
      <div className="w-full  flex flex-col">
        <span className="w-full flex md:flex-row  p-2 gap-4">
          <div className="w-full  p-1 flex flex-col gap-2 center  rounded-md bg-gradient-to-r from-[#272770]  to-[#BA3664]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">{`Total Number of Devices`}</p>
              <p className="text-white md:text-lg  font-semibold ">
                {" "}
                in Warehouse
              </p>
            </span>
            <span className="w-full flex pl-2 center  justify-between">
              <span className="w-full p-1">
                <img src={warehouse.src} alt="" className="w-6 h-6 " />
              </span>
              <span className="w-full text-white text-xl pr-3 md:pr-11 font-bold text-end">
                15
              </span>
            </span>
            <span className="w-full flex ">
              <p className="text-white gap-1 text-xs md:text-sm center font-base pl-2 ">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>

          <div className="w-full p-1 flex flex-col gap-2 rounded-md bg-gradient-to-r from-[#8056F8]  to-[#7691FE]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Number of Installed
              </p>
              <p className="text-white md:text-lg  font-semibold ">Devices</p>
            </span>
            <span className="w-full flex pl-2 center  justify-between">
              <span className="w-full p-1">
                <img src={installdevices.src} alt="" className="w-6 h-6 " />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                8
              </span>
            </span>
            <span className="w-full flex ">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2 ">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>

          <div className="w-full p-1 flex flex-col gap-2  rounded-md bg-gradient-to-r from-[#F77F02]  to-[#D1520C]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Number of Fleets
              </p>
              <p className="text-white md:text-lg  font-semibold ">Admins</p>
            </span>
            <span className="w-full flex pl-2 center  justify-between">
              <span className="w-full p-1">
                <img src={fleetadmins.src} alt="" className="w-6 h-6 " />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                2
              </span>
            </span>
            <span className="w-full flex ">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2 ">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>
        </span>
        <span className="w-full flex gap-4 p-2  ">
          <div className="w-full p-1 flex flex-col center gap-2 rounded-md bg-gradient-to-r from-[#D1520C]   to-[#F77F02]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Number of Active
              </p>
              <p className="text-white md:text-lg  font-semibold ">Devices</p>
            </span>
            <span className="w-full flex pl-2 center  justify-between">
              <span className="w-full p-1">
                <img src={activedevices.src} alt="" className="w-6 h-6 " />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                5
              </span>
            </span>
            <span className="w-full flex ">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2 ">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>
          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#7691FE]  to-[#8056F8]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Revenue
              </p>
              {/* <p className="text-white md:text-lg  font-semibold "></p> */}
              <p className="text-white md:text-lg  font-semibold ">Generated</p>
            </span>
            <span className="w-full flex pl-2 center  justify-between">
              <span className="w-full p-1">
                <img src={revenue.src} alt="" className="w-6 h-6 " />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                317000
              </span>
            </span>
            <span className="w-full flex ">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2 ">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>
          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#BA3664]  to-[#272770]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Number of Devices
              </p>
              <p className="text-white md:text-lg  font-semibold ">
                in Production
              </p>
            </span>
            <span className="w-full flex center pl-2   justify-between">
              <span className="w-full p-1">
                <img src={production.src} alt="" className="w-6 h-6" />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                77
              </span>
            </span>
            <span className="w-full flex ">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2 ">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>
        </span>

        <div className="w-full  h-full mb-4 flex md:flex-row flex-col gap-2 p-5 rounded-md ">
          <div className=" md:w-[50%]  md:h-[50%] w-full h-full">
            <Bar
              className="  justify-center items-center shadow-md "
              data={bardata}
            />
          </div>
          <div className="md:w-[50%] md:h-[50%] w-full h-full">
            <Line
              data={data}
              // options={options}
              className="justify-center items-center shadow-md "
            />
          </div>
        </div>
        <div className="w-full center  h-full">
          <div className="w-full center">
            <div className="w-[70%] h-[70%]">
              <PolarArea data={polarData2} options={polarOptions} />
            </div>
          </div>
          <div className="w-full h-full center">
            <div className="w-[70%] h-[70%]">
              <Doughnut
                data={donutData}
                // options={donutOptions}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
