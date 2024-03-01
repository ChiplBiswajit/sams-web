import { revenue } from "@/src/assets/SuperAdmin/dashboard";
import React from "react";
import { BiSolidShow } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

const users = [
  {
    Fleetid: 11,
    OrganizationalName: "User1",
    OwnerName: "biswa",
    totalDevices: 5,
    RevenueGenerated: "50800",
  },
  {
    Fleetid: 12,
    OrganizationalName: "User3",
    OwnerName: "anil",
    totalDevices: 10,
    RevenueGenerated: "70800",
  },
  {
    Fleetid: 13,
    OrganizationalName: "User2",
    OwnerName: "rajesh",
    totalDevices: 20,
    RevenueGenerated: "40800",
  },
  {
    Fleetid: 14,
    OrganizationalName: "User7",
    OwnerName: "sradha",
    totalDevices: 23,
    RevenueGenerated: "78800",
  },
  {
    Fleetid: 14,
    OrganizationalName: "User8",
    OwnerName: "abinash",
    totalDevices: 95,
    RevenueGenerated: "876540",
  },
];

export default function SAFleets() {
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
              <strong>Fleet Id:</strong> {user.Fleetid}
              <br />
              <strong>Organizational Name:</strong> {user.OrganizationalName}
              <br />
              <strong>Owner Name:</strong> {user.OwnerName}
              <br />
              <strong>Total Devices:</strong> {user.totalDevices}
              <br />
              <strong>Revenue Generated:</strong> {user.RevenueGenerated}
              <br />
            </div>
            <div className="center ">
              <button>
                <GiReceiveMoney className="text-blue-600 md:text-xl text-3xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <table className="md:min-w-[99%] divide-y divide-gray-200 m-1  hidden md:table">
        <thead className="bg-[#b2c1e0]">
          <tr className=" ">
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
              FleetId
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Organizational Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Owner Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Total Devices
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Revenue Generated
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Transaction
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index} className="">
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.Fleetid}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.OrganizationalName}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.OwnerName}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.totalDevices}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.RevenueGenerated}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                <button className="">
                  <GiReceiveMoney className="text-blue-600 text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
