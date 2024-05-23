import React, { useEffect, useState } from "react";
import { fleets } from "@/src/assets/SuperAdmin/Sidebar/Index";
import {
  activedevices,
  fleetadmins,
  installdevices,
  production,
 
} from "@/src/assets/SuperAdmin/dashboard";
import { MdInsights } from "react-icons/md";
import {PolarArea, Doughnut } from "react-chartjs-2";
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
import Link from "next/link";

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };


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
          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#BA3664]  to-[#272770]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Number of Fleets
              </p>
              {/* <p className="text-white md:text-lg  font-semibold "></p> */}
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
          
          <div className="w-full p-1 flex flex-col gap-2 rounded-md bg-gradient-to-r from-[#8056F8]  to-[#7691FE]" onClick={toggleFormVisibility}>
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
             No of Devices in total 
              </p>
              <p className="text-white md:text-lg  font-semibold ">District</p>
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
          

          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#BA3664]  to-[#272770]">
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total Number of  InActive 
              </p>
              <p className="text-white md:text-lg  font-semibold ">
               Devices
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

        {isFormVisible && (
          // <div className="mt-2 p-2 bg-white rounded-md shadow-md">
            <div className="bg-white p-2 rounded-md w-[80%] h-[80%]">
            <h2 className="text-lg font-semibold">Form Title</h2>
            <form>
              {/* Add your form fields here */}
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-s-lg">
                      District name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                      No of assign devices
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                        1
                      </td>
                      <td className="px-6 py-4">
                        $2999
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4">
                        1
                      </td>
                      <td className="px-6 py-4">
                        $1999
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                      </th>
                      <td className="px-6 py-4">
                        1
                      </td>
                      <td className="px-6 py-4">
                        $99
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-gray-900 dark:text-white">
                      <th scope="row" className="px-6 py-3 text-base">Total</th>
                      <td className="px-6 py-3">3</td>
                      <td className="px-6 py-3">21,000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <button
                type="button"
                onClick={toggleFormVisibility}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
              </button>
            </form>
          </div>
          // </div>
        )}
        <div className="w-full center  h-full">
          <div className="w-full h-full center">
            <div className="w-[70%] h-[70%]">
              <Doughnut
                data={donutData}
                // options={donutOptions}
              />{" "}
            </div>
          </div>
          <div className="w-full center">
            <div className="w-[70%] h-[70%]">
              <PolarArea data={polarData2} options={polarOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

