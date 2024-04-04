import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Loader from "../Loader";

interface StocksData {
  status: any; // Adjust the type according to your API response
  stocks: any;
  // Add other properties as needed
}
export default function SAStocks() {
  const [stocksData, setStocksData] = useState<StocksData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const API_URL = "https://24x7healthcare.live/admins/getStocks";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStocksData(data);
        // console.log("Admin List +++++++++", data);
      } else {
        // console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen">
      {loading && <Loader />}
      <div className="md:hidden center flex flex-col">
        {stocksData && stocksData?.status === 200 ? (
          <>
            {stocksData?.stocks?.map((user: any, index: any) => {
              // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", stocksData); // Log apiData here
              return (
                <div
                  key={index}
                  className="m-2 flex bg-[#d0d6e2] w-[90%] rounded-lg p-2"
                >
                  <div className="w-[90%]">
                    <strong className="">Sl No: {index + 1}</strong>
                    <br />
                    <strong> Device Id:</strong> {user.device_Id}
                    <br />
                    <strong> Owner ID:</strong> {user.transfer_owner_id}
                    <br />
                    <strong> Ambulance ID:</strong> {user.ambulance_id}
                    <br />
                    <strong> Ambulance Type: </strong>
                    <span
                      className="font-bold "
                      style={{
                        color:
                          user.ambulance_type === 1
                            ? "red"
                            : user.ambulance_type === 2
                            ? "blue"
                            : "inherit",
                      }}
                    >
                      {user.ambulance_type === 1
                        ? "ALS"
                        : user.ambulance_type === 2
                        ? "BLS"
                        : "N/A"}
                    </span>
                    <br />
                    <strong> Device Install Status:</strong>{" "}
                    <span
                      className="font-semibold "
                      style={{
                        color:
                          user.device_install === 1
                            ? "green"
                            : user.device_install === 0
                            ? "red"
                            : "inherit",
                      }}
                    >
                      {user.device_install === 1
                        ? "Installed"
                        : user.device_install === 0
                        ? "Not Installed"
                        : ""}
                    </span>
                    <br />
                  </div>
                  {/* <div className="center gap-3 flex flex-col">
                    <button className="">
                      <FaEdit className="text-xl" />
                    </button>
                  </div> */}
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-full h-[80vh] center font-normal text-2xl  ">
            {loading ? "" : "No data available"}
          </div>
        )}
      </div>

      <table className="min-w-[99%] divide-y divide-gray-200 m-1 hidden md:table">
        <thead className="bg-[#b2c1e0] ">
          <tr className="">
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Sl.no.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Device Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Owner ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Ambulance ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Ambulance Type
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Device Install Status
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Edit
            </th> */}
          </tr>
        </thead>
        {stocksData && stocksData?.status === 200 ? (
          <>
            {stocksData?.stocks?.map((user: any, index: any) => {
              // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", stocksData); // Log apiData here
              return (
                <tbody  key={index} className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user.device_Id}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user.transfer_owner_id}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user.ambulance_id ? user.ambulance_id : "Not Assigned"}
                    </td>

                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      <span
                        className="font-bold "
                        style={{
                          color:
                            user.ambulance_type === 1
                              ? "red"
                              : user.ambulance_type === 2
                              ? "green"
                              : "inherit",
                        }}
                      >
                        {user.ambulance_type === 1
                          ? "ALS"
                          : user.ambulance_type === 2
                          ? "BLS"
                          : "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      <span
                        className="font-semibold "
                        style={{
                          color:
                            user.device_install === 1
                              ? "green"
                              : user.device_install === 0
                              ? "red"
                              : "inherit",
                        }}
                      >
                        {user.device_install === 1
                          ? "Installed"
                          : user.device_install === 0
                          ? "Not Installed"
                          : ""}
                      </span>
                    </td>
                    {/* <td className="px-6 py-2 text-center whitespace-nowrap">
                      <button className="">
                        <FaEdit className="text-xl" />
                      </button>
                    </td> */}
                  </tr>
                </tbody>
              );
            })}
          </>
        ) : (
          <div className="w-full h-[80vh] center font-normal text-2xl  ">
            {loading ? "" : "No data available"}
          </div>
        )}
      </table>
    </section>
  );
}
