import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Loader from "../Loader";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

interface ApiData {
  status: any; // Adjust the type according to your API response
  admin: any;
}
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
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [apiData, setApiData] = useState<ApiData | undefined>(undefined);
  const [formData, setFormData] = useState({
    product_no: "",
    device_id: "",
    camera_id: "",
    ambulance_id: "",
    router_sim_no: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add your form submission logic here
    // console.log("Form submitted:", formData);
    // Reset form fields
    setFormData({
      product_no: "",
      device_id: "",
      camera_id: "",
      ambulance_id: "",
      router_sim_no: "",
    });
  };

  useEffect(() => {
    fetchData();
    fetchDataAdmin();
  }, []);

  const fetchData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      const API_URL = "https://smartambulance.in/admins/getStocks";
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

  const fetchDataAdmin = async () => {
    // const API_URL = "https://samsapi.smartambulance.in/admins/getAdmin";
    // const API_URL = "https://0r4mtgsn-3006.inc1.devtunnels.ms/admins/getAdmin";
        const API_URL = "https://sams.24x7healthcare.live/admins/getAdmin";


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
        // Remove the first index of admin array
        if (data.admin && data.admin.length > 0) {
          data.admin = data.admin.slice(1);
        }
        // setApiData(data);
        // console.log("Admin List +++++++++", data);
        sessionStorage.setItem("adminList", JSON.stringify(data.admin));
        // console.log("tttttttt", data.admin)

        // store adminId for each element
        if (data.admin && data.admin.length > 0) {
          data.admin.forEach((admin: any, index: any) => {
            sessionStorage.setItem(
              `adminId_${index}`,
              JSON.stringify(admin.adminId)
            );
          });
        }

        // Retrieve adminId for each element
        for (let index = 0; index < data.admin.length; index++) {
          const adminId = JSON.parse(
            sessionStorage.getItem(`adminId_${index}`) ?? ""
          );
          // console.log(`Admin ID for element ${index}:`, adminId);
        }
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
      <div className="w-full p-2 flex justify-end  gap-8">
        <div className="flex gap-6">
          <select
            className="px-2 py-2 h-10 rounded-md text-black font-semibold bg-[#ECEEF1]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option
              className="text-black bg-white  text-center font-semibold"
              value="ALL"
            >
              Admin List
            </option>
            <option
              className="text-red-600 bg-white text-center font-semibold"
              value="ALS"
            >
              ALS
            </option>
            <option
              className="text-yellow-600 bg-white text-center font-semibold"
              value="BLS"
            >
              BLS
            </option>
          </select>
        </div>

        <button
          className="bg-blue-500 flex center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 transform hover:scale-110"
          id="animatedButton"
          onClick={toggleForm}
        >
          <IoMdAddCircle className="text-white text-xl" />
          Add Stocks
        </button>
      </div>

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
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Sl.no.
            </th>

            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              product no
            </th>

            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Device Id
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Owner ID
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Ambulance ID
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Ambulance Type
            </th>
            <th
              scope="col"
              className="px-2 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Device Install Status
            </th>
            <th
              scope="col"
              className="px-2 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Update
            </th>
            <th
              scope="col"
              className="px-2 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Delete
            </th>
          </tr>
        </thead>

        {stocksData && stocksData?.status === 200 ? (
          <>
            {stocksData?.stocks?.map((user: any, index: any) => {
              // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", stocksData); // Log apiData here
              return (
                <tbody
                  key={index}
                  className="bg-white divide-y divide-gray-200"
                >
                  <tr>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user.product_no}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user.device_Id}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user.transfer_owner_id}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user.ambulance_id ? user.ambulance_id : "Not Assigned"}
                    </td>

                    <td className="px-2 py-2 text-center whitespace-nowrap">
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

                    <td className="px-2 py-2 text-center whitespace-nowrap">
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
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      <button className="text-green-500">
                        <FaEdit className="text-xl" />
                      </button>
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      <button className="text-red-500">
                        <MdDeleteForever className="text-xl" />
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

      {showForm && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[80%]">
            <div className="flex w-full justify-between items-center gap-2 mb-3">
              <h2 className="text-lg  font-bold  text-center">Add Stocks</h2>
              <RxCrossCircled
                className=" text-3xl text-center text-red-600"
                onClick={toggleForm}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-4 ">
              <div className="w-full grid grid-cols-3 gap-2 h-auto">
                <div className="mb-4">
                  <label
                    htmlFor="product_no"
                    className="block text-sm font-semibold text-black"
                  >
                    Product No:
                  </label>
                  <input
                    type="text"
                    id="product_no"
                    name="product_no"
                    className="mt-1 p-2 w-full border rounded-md "
                    // value={formik.values.userId}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // className={`mt-1 p-2 w-full border rounded-md ${formik.touched.userId && formik.errors.userId
                    //   ? "border-red-500"
                    //   : ""
                    //   }`}
                  />
                  {/* {formik.touched.userId && formik.errors.userId && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.userId}
                    </div>
                  )} */}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="device_id"
                    className="block text-sm font-semibold text-black"
                  >
                    Device ID:
                  </label>
                  <input
                    type="text"
                    id="device_id"
                    name="device_id"
                    className="mt-1 p-2 w-full border rounded-md "
                    // value={formik.values.name}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // className={`mt-1 p-2 w-full border rounded-md ${formik.touched.name && formik.errors.name
                    //   ? "border-red-500"
                    //   : ""
                    // }`}
                  />
                  {/* {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.name}
                    </div>
                  )} */}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-black"
                  >
                    Camera ID:
                  </label>
                  <input
                    type="text"
                    id="camera_id"
                    name="camera_id"
                    className="mt-1 p-2 w-full border rounded-md "
                    // value={formik.values.password}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // className={`mt-1 p-2 w-full border rounded-md ${formik.touched.password && formik.errors.password
                    //   ? "border-red-500"
                    //   : ""
                    //   }`}
                  />
                  {/* {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  )} */}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-semibold text-black"
                  >
                    Ambulance ID:
                  </label>
                  <input
                    type="text"
                    id="ambulance_id"
                    name="ambulance_id"
                    className="mt-1 p-2 w-full border rounded-md "
                    // value={formik.values.organizationName}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // className={`mt-1 p-2 w-full border rounded-md ${formik.touched.organizationName &&
                    //   formik.errors.organizationName
                    //   ? "border-red-500"
                    //   : ""
                    //   }`}
                  />
                  {/* {formik.touched.organizationName &&
                    formik.errors.organizationName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.organizationName}
                      </div>
                    )} */}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contactNo"
                    className="block text-sm font-semibold text-black"
                  >
                    Router_sim_No:
                  </label>
                  <input
                    type="tel"
                    id="router_sim_no"
                    name="router_sim_no"
                    className="mt-1 p-2 w-full border rounded-md "
                    // value={formik.values.contactNo}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // className={`mt-1 p-2 w-full border rounded-md ${formik.touched.contactNo && formik.errors.contactNo
                    //   ? "border-red-500"
                    //   : ""
                    //   }`}
                  />
                  {/* {formik.touched.contactNo && formik.errors.contactNo && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.contactNo}
                    </div>
                  )} */}
                </div>
              </div>

              <div className="flex justify-center -mb-[2%]">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="mr-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
