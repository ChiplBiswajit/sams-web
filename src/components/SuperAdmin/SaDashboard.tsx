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
import { PolarArea, Doughnut } from "react-chartjs-2";
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
import socketServcies from "@/src/utils/Socket/socketService";
import { storeObjByKey } from "@/src/utils/Socket/storage";
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

  // const donutData = {
  //   labels: ["All Devices", "Active", "Inactive"],
  //   datasets: [
  //     {
  //       label: "Total devices",
  //       data: [15, 5, 10],
  //       backgroundColor: [
  //         "rgb(54, 162, 235)",
  //         "rgb(0, 255, 0)",
  //         "rgb(255, 0, 0)",
  //       ],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

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

  const [res, setRes] = useState([]);

  useEffect(() => {
    const usernamedata = sessionStorage.getItem("userid");
    storeObjByKey("obj", usernamedata);
    socketServcies.initializeSocket();
    socketServcies.on("received_admin_data", (msg: any) => {
      console.log("ddddddddddddd", msg);
      setRes(msg);
      setTimeout(() => {
        // setLoading(false);
        // setModalVisible(false);
      }, 10000);
    });
  }, []);

  const donutData = {
    labels: ["Active", "Inactive", "All Devices"],
    datasets: [
      {
        label: "Total devices",
        data: [
          (res[0] as any)?.onlineDevice || 0,
          (res[0] as any)?.oflineDevice || 0,
          (res[0] as any)?.totalDevice || 0,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(0, 255, 0)",
          "rgb(255, 0, 0)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Render loading state if res is empty
  const isLoading = !res.length;

  // bg-[#EEF1FC]
  return (
    <section className="w-full h-full  relative ">
      <div className="w-full  flex flex-col">
        <span className="w-full flex md:flex-row  p-2 gap-4">
          <div className="w-full p-1 flex flex-col gap-2 center rounded-md bg-gradient-to-r from-[#272770]  to-[#BA3664]">
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

          <div
            className="w-full p-1 flex flex-col gap-2 rounded-md bg-gradient-to-r from-[#7691FE]   to-[#8056F8]"
            onClick={toggleFormVisibility}
          >
            <span className=" w-full flex flex-col pl-2">
              <p className="text-white md:text-lg  font-semibold ">
                Total No of Devices in total
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
          <div className="w-full p-1 flex flex-col center gap-2 rounded-md bg-gradient-to-r from-[#8056F8]  to-[#7691FE]">
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
                {(res[0] as any)?.onlineDevice || 0}
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
                Total Number of InActive
              </p>
              <p className="text-white md:text-lg  font-semibold ">Devices</p>
            </span>
            <span className="w-full flex center pl-2   justify-between">
              <span className="w-full p-1">
                <img src={production.src} alt="" className="w-6 h-6" />
              </span>
              <span className="w-full text-white text-xl md:pr-11 pr-3 font-bold text-end">
                {(res[0] as any)?.oflineDevice || 0}
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
          <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-lg w-[50%] h-[60%] overflow-y-auto">
              <div className="flex justify-between">
                <div className="flex w-full justify-center items-center gap-2 mb-3">
                  <h2 className="text-lg  font-bold  text-center">
                    Total device in District
                  </h2>
                </div>
                <div className="flex justify-end items-center">
                  <RxCrossCircled
                    className=" text-3xl text-center text-red-600"
                    onClick={toggleFormVisibility}
                  />
                </div>
              </div>

              <div className="p-4 ">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
                    <tbody>
                      <tr className="bg-white text-center dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Apple MacBook Pro 17
                        </th>
                        <td className="px-6 py-4">1</td>
                      </tr>
                      <tr className="bg-white text-center dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Microsoft Surface Pro
                        </th>
                        <td className="px-6 py-4">1</td>
                      </tr>
                      <tr className="bg-white text-center dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Magic Mouse 2
                        </th>
                        <td className="px-6 py-4">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full center  h-full">
          <div className="w-full h-ful relative">
            {isLoading ? (
              <div className="p-2 center text-lg">Loading Chart...</div>
            ) : (
              <div className="w-full flex flex-col">
                {/* Your other JSX code */}
                <div className="w-full center">
                  <div className="w-[70%] h-[70%]">
                    <Doughnut data={donutData} />
                  </div>
                </div>
                {/* Your other JSX code */}
              </div>
            )}
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
