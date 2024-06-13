import React, { useState, useEffect } from "react";

export default function SAmaintenance() {
  const [maintenanceData, setMaintenanceData] = useState(null); // Initialize as null

  const fetchData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      const response = await fetch(
        "https://24x7healthcare.live/maintenNance/get",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMaintenanceData(data.result); // Update state with the result array
    } catch (error) {
      // console.error("Error fetching maintenance data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [maintenanceData]); // Run once after initial render

  // console.log("maintenanceData",maintenanceData)

  return (
    <section className="h-full bg-zinc-100">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-[99%] divide-y divide-gray-200 m-1 hidden md:table">
          <thead className="bg-[#bfcde7]">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
              >
                Sl.no.
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
              >
                Ambulance No
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
              >
                Remark(Reason)
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
              >
                Region
              </th>
            </tr>
          </thead>
          <tbody>
            {maintenanceData && (maintenanceData as any).length > 0 ? (
              (maintenanceData as any).map((item: any, index: any) => (
                <tr key={index} className="border-b border-gray-200 ">
                  <td className="px-6 py-4  text-center text-gray-900 whitespace-nowrap bg-WHITE dark:text-white dark:bg-gray-800">
                  {index + 1}
                  </td>
                  <td className="px-6 py-4  text-center text-gray-900 whitespace-nowrap bg-WHITE dark:text-white dark:bg-gray-800">
                    {item.ambulance_no}
                  </td>
                  <td className="px-6 py-4  text-center text-gray-900 whitespace-nowrap bg-WHITE dark:text-white dark:bg-gray-800">
                    {item.remarks}
                  </td>
                  <td className="px-6 py-4  text-center text-gray-900 whitespace-nowrap bg-WHITE dark:text-white dark:bg-gray-800">
                    {item.region}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-black">
                  {maintenanceData && (maintenanceData as any).length === 0
                    ? "No Ambulance under maintenance"
                    : "Loading..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
