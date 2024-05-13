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
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";



interface ApiData {
  status: any; // Adjust the type according to your API response
  admin: any;
  // Add other properties as needed
}

export default function SAChiplAdmin() {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [formikFunction, setFormikFunction] = useState<any>(null); // State to hold formik function
  const [selectedUser, setSelectedUser] = useState(null);
  const [apiData, setApiData] = useState<ApiData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // useEffect to call the formik function
  useEffect(() => {
    if (formikFunction) {
      // call formik function here
      formikFunction.handleSubmit();
    }
  }, [formikFunction]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const API_URL = "https://samsapi.smartambulance.in/admins/getAdmin";
    const API_URL = "https://0r4mtgsn-3006.inc1.devtunnels.ms/admins/getAdmin";
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
        setApiData(data);
        console.log("Admin List +++++++++", data);
      } else {
        // console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddAdminForm = () => {
    setShowAddAdminForm(!showAddAdminForm);
  };

  const openUpdateProfileForm = (user: any) => {
    setSelectedUser(user);
    setShowUpdateProfileForm(true);
  };

  const closeUpdateProfileForm = () => {
    setShowUpdateProfileForm(false);
  };

  const formik = useFormik({
    initialValues: {
      name: selectedUser ? selectedUser.name : "",
      email: selectedUser ? selectedUser.emailId : "",
      contactNo: selectedUser ? selectedUser.contactNo : ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      contactNo: Yup.string().required("Contact number is required")
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const response = await axios.put(
          `https://0r4mtgsn-3006.inc1.devtunnels.ms/users/updateProfile/${selectedUser.id}`,
          {
            name: values.name,
            emailId: values.email,
            contactNo: values.contactNo
          }
        );
        setLoading(false);
        if (response.status === 200) {
          closeUpdateProfileForm();
          Swal.fire({
            icon: "success",
            title: "Profile Updated Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Error updating profile:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
        });
      }
    },
  });


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
              // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", apiData); // Log apiData here
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
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Slno
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              AdminId
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Email id
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Organization Name
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Contact No
            </th>
            <th
              scope="col"
              className="px-2 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Parent Admin
            </th>
            <th
              scope="col"
              className="px-2 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Total User Created
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Edit
            </th>
            <th
              scope="col"
              className="px-2 py-3  text-xs text-center font-bold text-black uppercase tracking-wider"
            >
              Delete
            </th>
          </tr>
        </thead>
        {apiData && apiData?.status === 200 ? (
          <>
            {apiData?.admin?.map((user: any, index: any) => {
              // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", apiData); // Log apiData here
              return (
                <tbody key={index} className="bg-white divide-y divide-gray-200">
                  <tr >
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.adminId}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.name}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.emailId}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.organizationName}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.contactNo}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.parentAdmin}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      {user?.totalUserCreated}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap">
                      <button className="text-green-500" onClick={openUpdateProfileForm}>
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
      {showAddAdminForm && <SAAddAdmin toggleForm={toggleAddAdminForm} setFormikFunction={setFormikFunction} />}


      {/* Update Profile Form */}
      {showUpdateProfileForm && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  className="mt-1 p-2 w-full rounded-md border border-black "
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="mt-1 p-2 w-full rounded-md border border-black "

                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  id="contactNo"
                  type="text"
                  {...formik.getFieldProps("contactNo")}
                  className="mt-1 p-2 w-full rounded-md border border-black "

                />
                {formik.touched.contactNo && formik.errors.contactNo && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactNo}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeUpdateProfileForm}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
