import React from "react";
import { FaEdit } from "react-icons/fa";

export default function SAStocks() {
  const users = [
    {
      ProductSlNo: "ABC123",
      ProductBatchID: "BATCH001",
      ManufacturingDate: "2024-02-24",
      ActiveStatus: "Active",
      WorkingStatus: "Working",
    },
    {
      ProductSlNo: "XYZ456",
      ProductBatchID: "BATCH002",
      ManufacturingDate: "2024-02-25",
      ActiveStatus: "Inactive",
      WorkingStatus: "Not Working",
    },
    {
      ProductSlNo: "ABC123",
      ProductBatchID: "BATCH001",
      ManufacturingDate: "2024-02-24",
      ActiveStatus: "Active",
      WorkingStatus: "Working",
    },
    {
      ProductSlNo: "ABC123",
      ProductBatchID: "BATCH001",
      ManufacturingDate: "2024-02-24",
      ActiveStatus: "Active",
      WorkingStatus: "Working",
    },
    {
      ProductSlNo: "ABC123",
      ProductBatchID: "BATCH001",
      ManufacturingDate: "2024-02-24",
      ActiveStatus: "Active",
      WorkingStatus: "Working",
    },
    {
      ProductSlNo: "ABC123",
      ProductBatchID: "BATCH001",
      ManufacturingDate: "2024-02-24",
      ActiveStatus: "Active",
      WorkingStatus: "Working",
    },
  ];
  return (
    <section className="h-screen">
      <div className="md:hidden center flex flex-col">
        {users.map((user, index) => (
          <div
            key={index}
            className="m-2 flex bg-[#d0d6e2] w-[90%] rounded-lg p-2"
          >
            <div className="w-[90%]">
              <strong className="text-red-600">Sl No:</strong> {index + 1}
              <br />
              <strong>Fleet Id:</strong> {user.ProductSlNo}
              <br />
              <strong>Organizational Name:</strong> {user.ProductBatchID}
              <br />
              <strong>Owner Name:</strong> {user.ManufacturingDate}
              <br />
              <strong> Active Status:</strong> {user.ActiveStatus}
              <br />
              <strong> Working Status:</strong> {user.WorkingStatus}
              <br />
            </div>
            <div className="center gap-3 flex flex-col">
              <button className="">
                <FaEdit className="text-xl" />
              </button>
            </div>
          </div>
        ))}
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
              Product Sl No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Product Batch ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Manufacturing Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Active Status
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Working Status
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.ProductSlNo}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.ProductBatchID}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.ManufacturingDate}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.ActiveStatus}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.WorkingStatus}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                <button className="">
                  <FaEdit className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
