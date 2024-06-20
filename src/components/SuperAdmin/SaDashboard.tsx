import React, { useEffect, useState } from "react";
import { fleets } from "@/src/assets/SuperAdmin/Sidebar/Index";
import { RxCrossCircled } from "react-icons/rx";
import {
  activedevices,
  fleetadmins,
  installdevices,
  production,
} from "@/src/assets/SuperAdmin/dashboard";
import { MdInsights } from "react-icons/md";
import { PolarArea, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  DoughnutController,
} from "chart.js";
import socketServcies from "@/src/utils/Socket/socketService";
import { storeObjByKey } from "@/src/utils/Socket/storage";
import Responsivesidebar from "@/src/layouts/SuperAdmin/Responsivesidebar";
import { Router, useRouter } from "next/router";

Chart.register(
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  DoughnutController
);

export default function SADashboard() {
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const [dashboardData, setDashboardData] = useState({
    totalDevice: 0,
    totalAdmins: 0,
    onlineDevice: 0,
    oflineDevice: 0,
  });

  const fetchDashboardData = async () => {
    const authToken = sessionStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://24x7healthcare.live/admins/getDashBoardApi",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.result);
        // console.log("dashboardData..................:", data.result);
      } else {
        // console.error("Network response was not ok.");
      }
    } catch (error) {
      // console.error("Fetch error:", error);
    }
  };

  const viewalldistrict = (dashboardData as any)?.viewDistrict;

  useEffect(() => {
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dashboardData]);

  const donutData = {
    labels: ["Active", "Inactive", "All Devices"],
    datasets: [
      {
        label: "Total devices",
        data: [
          dashboardData.onlineDevice || 0,
          dashboardData.oflineDevice || 0,
          dashboardData.totalDevice || 0,
        ],
        backgroundColor: [
          "rgb(0, 255, 0)",
          "rgb(255, 0, 0)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: viewalldistrict?.map((district: any) => district.district_name),
    datasets: [
      // {
      //   label: "Total Ambulances",
      //   data: viewalldistrict?.map(
      //     (district: any) => dashboardData.totalDevice
      //   ),
      //   backgroundColor: "rgba(153, 102, 255, 0.2)",
      //   borderColor: "rgba(153, 102, 255, 1)",
      //   borderWidth: 1,
      // },
      {
        label: "Number of Devices",
        data: viewalldistrict?.map((district: any) => district.no_of_devices),
        backgroundColor: "rgba(120,139,254,1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        precision: 0,
        suggestedMin: 0, // Set the minimum value to 0
        suggestedMax: 50, // Set the maximum value (adjust as needed)
      },
    },
  };

  return (
    <section className="w-full h-full md:relative bg-zinc-100">
      <div className="w-full flex flex-col">
        <span className="w-full flex md:flex-row flex-col p-2 gap-4">
          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#272770] to-[#BA3664]">
            <span className="w-full flex flex-col pl-2">
              <p className="text-white md:text-lg font-semibold">
                Total Number of Fleets
              </p>
              <p className="text-white md:text-lg font-semibold">Admins</p>
            </span>
            <span className="w-full flex pl-2 center justify-between">
              <span className="w-full p-1">
                <img src={fleetadmins.src} alt="" className="w-6 h-6" />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                {dashboardData.totalAdmins}
              </span>
            </span>
            <span className="w-full flex">
              <p
                className="text-white gap-1 md:text-sm text-xs center font-base pl-2"
                onClick={() => {
                  router.push("./admin ");
                }}
              >
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>

          <div
            className="w-full p-1 flex flex-col gap-2 rounded-md bg-gradient-to-r from-[#00A4FB] via-[#1F3597] to-[#00264D]"
            onClick={toggleFormVisibility}
          >
            <span className="w-full flex flex-col pl-2">
              <p className="text-white md:text-lg font-semibold">
                Total No of Devices in total
              </p>
              <p className="text-white md:text-lg font-semibold">District</p>
            </span>
            <span className="w-full flex pl-2 center justify-between">
              <span className="w-full p-1">
                <img src={installdevices.src} alt="" className="w-6 h-6" />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                {dashboardData.totalDevice}
              </span>
            </span>
            <span className="w-full flex">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>
        </span>
        <span className="w-full flex md:flex-row flex-col gap-4 p-2">
          <div className="w-full p-1 flex flex-col center gap-2 rounded-md bg-gradient-to-r from-[#00264D] via-[#1F3597] to-[#00A4FB]">
            <span className="w-full flex flex-col pl-2">
              <p className="text-white md:text-lg font-semibold">
                Total Number of Active
              </p>
              <p className="text-white md:text-lg font-semibold">Devices</p>
            </span>
            <span className="w-full flex pl-2 center justify-between">
              <span className="w-full p-1">
                <img src={activedevices.src} alt="" className="w-6 h-6" />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                {dashboardData.onlineDevice}
              </span>
            </span>
            <span className="w-full flex">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>

          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#BA3664] to-[#272770]">
            <span className="w-full flex flex-col pl-2">
              <p className="text-white md:text-lg font-semibold">
                Total Number of InActive
              </p>
              <p className="text-white md:text-lg font-semibold">Devices</p>
            </span>
            <span className="w-full flex center pl-2 justify-between">
              <span className="w-full p-1">
                <img src={production.src} alt="" className="w-6 h-6" />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                {dashboardData.oflineDevice}
              </span>
            </span>
            <span className="w-full flex">
              <p className="text-white gap-1 md:text-sm text-xs center font-base pl-2">
                View Insights
                <MdInsights className="text-white" />
              </p>
            </span>
          </div>
        </span>

        {isFormVisible && (
          <div className="fixed z-[999] top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-lg  md:w-[50%] md:h-[50%] overflow-y-auto">
              <div className="flex justify-between">
                <div className="flex w-full justify-center items-center gap-2 mb-3">
                  <h2 className="text-lg font-bold text-center">
                    Total device in District
                  </h2>
                </div>
                <div className="flex justify-end items-center">
                  <RxCrossCircled
                    className="text-3xl text-center text-red-600"
                    onClick={toggleFormVisibility}
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center rounded-s-lg"
                        >
                          District Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center rounded-e-lg"
                        >
                          No. of devices Assigned devices
                        </th>
                      </tr>
                    </thead>
                    {viewalldistrict?.map((district: any, index: number) => (
                      <tbody key={index}>
                        <tr className="bg-white text-center ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {district?.district_name}
                          </th>
                          <td className="px-6 py-4">
                            {district.no_of_devices}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full center md:gap-3 gap-10 p-1  h-full flex md:flex-row flex-col ">
          <div className="w-full h-full ">
            <div className="w-full flex flex-col">
              <div className="w-full center">
                <div className="w-[100%] h-[54vh] bg-slate-100 rounded-xl ">
                  <div className="w-[100%] h-[100%] flex center ">
                    <Doughnut data={donutData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full center">
            <div className="w-[100%] h-[54vh] bg-slate-100 rounded-xl ">
              <div className="w-[100%] h-[100%] flex center ">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
