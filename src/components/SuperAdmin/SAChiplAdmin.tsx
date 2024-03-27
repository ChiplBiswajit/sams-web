import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidShow } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import Loader from "../Loader";
import SAAddAdmin from "./SAAddAdmin";

interface ApiData {
  status: any; // Adjust the type according to your API response
  admin: any;
  // Add other properties as needed
}

export default function SAChiplAdmin() {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [formikFunction, setFormikFunction] = useState<any>(null); // State to hold formik function

// useEffect to call the formik function
useEffect(() => {
  if (formikFunction) {
    // call formik function here
    formikFunction.handleSubmit();
  }
}, [formikFunction]);


  const [apiData, setApiData] = useState<ApiData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://sams.24x7healthcare.live/admins/getAdmin";

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
        setApiData(data);
        console.log("Admin List +++++++++", data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddAdminForm = () => {
    setShowAddAdminForm(!showAddAdminForm);
  };

  return (
    <section className="h-screen">
      <div className="w-full p-2 flex justify-end ">
        <button
          className="bg-blue-500 flex center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 transform hover:scale-110"
          id="animatedButton"
          onClick={toggleAddAdminForm}
        >
          <IoMdAddCircle className="text-white text-xl" />
          Add Admins
        </button>
      </div>

      {loading && <Loader />}

      <div className="md:hidden center flex flex-col">
        {apiData && apiData?.status === 200 ? (
          <>
            {apiData?.admin?.map((user: any, index: any) => {
              console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", apiData); // Log apiData here
              return (
                <div
                  key={index}
                  className="m-2 flex bg-[#d0d6e2] w-[90%] rounded-lg p-2"
                >
                  <div className="w-[90%]">
                    <strong className="text-red-600">Sl No:</strong> {index + 1}
                    <br />
                    <strong>Fleet Id:</strong> {user?.adminId}
                    <br />
                    <strong>Name:</strong> {user?.name}
                    <br />
                    <strong>Organization Name:</strong> {user?.organizationName}
                    <br />
                    <strong> Contact No:</strong> {user?.contactNo}
                    <br />
                    <strong>Parent Admin:</strong> {user?.parentAdmin}
                    <br />
                    <strong>Total User Created :</strong>{" "}
                    {user?.totalUserCreated}
                    <br />
                  </div>
                  <div className="center gap-3 flex flex-col">
                    <button className="text-blue-500">
                      <BiSolidShow className="text-xl" />
                    </button>
                    <button className="text-green-500">
                      <FaEdit className="text-xl" />
                    </button>
                  </div>
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

      <table className="min-w-[99%] divide-y divide-gray-200 m-1  hidden md:table">
        <thead className="bg-[#b2c1e0] ">
          <tr className="">
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Slno
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              AdminId
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Organization Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Contact No
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Parent Admin
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Total User Created
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              View
            </th>
            <th
              scope="col"
              className="px-6 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Edit
            </th>
          </tr>
        </thead>
        {apiData && apiData?.status === 200 ? (
          <>
            {apiData?.admin?.map((user: any, index: any) => {
              console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", apiData); // Log apiData here
              return (
                <tbody  key={index} className="bg-white divide-y divide-gray-200">
                  <tr >
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user?.adminId}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user?.name}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user?.organizationName}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user?.contactNo}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user?.parentAdmin}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      {user?.totalUserCreated}
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      <button className="text-blue-500">
                        <BiSolidShow className="text-xl" />
                      </button>
                    </td>
                    <td className="px-6 py-2 text-center whitespace-nowrap">
                      <button className="text-green-500">
                        <FaEdit className="text-xl" />
                      </button>
                    </td>
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
      {showAddAdminForm && <SAAddAdmin toggleForm={toggleAddAdminForm} setFormikFunction={setFormikFunction} />}
    </section>
  );
}
