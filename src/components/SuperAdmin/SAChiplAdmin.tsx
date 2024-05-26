import React, { useCallback, useEffect, useState } from "react";
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
}

export default function SAChiplAdmin() {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [formikFunction, setFormikFunction] = useState<any>(null); // State to hold formik function
  const [apiData, setApiData] = useState<ApiData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    contactNo: "",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  
  // Calculate the range of items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData?.admin.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [selectedAdminId, setSelectedAdminId] = useState(""); // State variable to hold the selected admin ID
  const handleInputChange = (field: any, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // console.log("Form data submitted:", formData);
    updateAdminData(); // Call the function to update profile data
    // Close the dialog after submission
    // setIsDialogOpen(false);
  };


  const updateAdminData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");

      // const API_URL = `https://0r4mtgsn-3006.inc1.devtunnels.ms/users/updateProfile/${userId}`;
      const API_URL = `https://sams.24x7healthcare.live/users/updateProfile/${selectedAdminId}`;

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // console.log("Profile updated successfully");
        fetchData();
        closeUpdateProfileForm();

        Swal.fire({
          icon: "success",
          title: "Data updated Successfully",
          // text: "You are now logged in.",
          confirmButtonColor: "#01246F",
          timer: 1000,
        });
        // Optionally, you can perform any actions after successful update
      } else {
        // console.error("Failed to update profile");
        // Handle error case here

        Swal.fire({
          icon: "error",
          title: "Data updated Failed",
          confirmButtonColor: "#01246F",
        });
      }
    } catch (error) {
      // console.error("Error while updating profile:", error);

      Swal.fire({
        icon: "error",
        title: "Error while updating profile.",
        confirmButtonColor: "#01246F",
      });
      // Handle error case here
    }
  };


  const deleteAdmin = async (adminId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this admin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const authToken = sessionStorage.getItem("authToken");
        const API_URL = `https://sams.24x7healthcare.live/users/delete/${adminId}`;
        const response = await fetch(API_URL, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          fetchData();

          Swal.fire({
            icon: "success",
            title: "Admin deleted successfully",
            confirmButtonColor: "#01246F",
            timer: 1000,
          });
        } else {
          // console.error("Failed to delete admin");

          Swal.fire({
            icon: "error",
            title: "Admin deletion failed",
            confirmButtonColor: "#01246F",
          });
        }
      }
    } catch (error) {
      // console.error("Error while deleting admin:", error);

      Swal.fire({
        icon: "error",
        title: "Error while deleting admin.",
        confirmButtonColor: "#01246F",
      });
    }
  };



  // useEffect to call the formik function
  useEffect(() => {
    if (formikFunction) {
      // call formik function here
      formikFunction.handleSubmit();
    }
  }, [formikFunction]);

  useEffect(() => {
    fetchData();
  }, [apiData]);

  
  


  const fetchData = async () => {
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
        setApiData(data);
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

  const toggleAddAdminForm = () => {
    setShowAddAdminForm(!showAddAdminForm);
  };


  const openUpdateProfileForm = (user: any) => {
    setShowUpdateProfileForm(true);
    setSelectedAdminId(user.adminId);
    setFormData({
      name: user.name,
      emailId: user.emailId,
      contactNo: user.contactNo,
    })
    // console.log("qqqqqq", adminId);
  };
  const closeUpdateProfileForm = () => {
    setShowUpdateProfileForm(false);
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
                    <strong>Email:</strong> {user?.emailId}
                    <br />
                    <strong>Organization Name:</strong> {user?.organizationName}
                    <br />
                    <strong>Contact No:</strong> {user?.contactNo}
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

      <table className="min-w-[99%] divide-y divide-gray-200 m-1  hidden md:table ">

        {apiData && apiData?.status === 200 ? (
          <><thead className="bg-[#b2c1e0] border-b border-gray-300">
            <tr className="border border-gray-300">
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Sl no
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Admin Id
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Email id
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Organization Name
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Contact No
              </th>
              <th
                scope="col"
                className="px-2 py-3  text-sm text-center font-bold text-black  tracking-wider border border-gray-300"
              >
                Parent Admin
              </th>
              <th
                scope="col"
                className="px-2 py-3  text-sm text-center font-bold text-black  tracking-wider border border-gray-300"
              >
                Total User Created
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-center text-sm font-bold text-black  tracking-wider border border-gray-300"
              >
                Edit
              </th>
              <th
                scope="col"
                className="px-2 py-3  text-sm text-center font-bold text-black  tracking-wider border border-gray-300"
              >
                Delete
              </th>
            </tr>
          </thead><>
              {apiData?.admin?.map((user: any, index: any) => {
                // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", apiData); // Log apiData here
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
                        <button
                          className="text-green-500"
                          onClick={() => openUpdateProfileForm(user)}
                        >
                          <FaEdit className="text-xl" />
                        </button>
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        <button
                          className="text-red-500"
                          onClick={() => deleteAdmin(user.adminId)}
                        >
                          <MdDeleteForever className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </></>
        ) : (
          <div className="w-full h-[80vh] center font-normal text-2xl  ">
            {loading ? "" : "No data available"}
          </div>
        )}
      </table>

      {showAddAdminForm && (
        <SAAddAdmin
          toggleForm={toggleAddAdminForm}
          setFormikFunction={setFormikFunction}
        // onAdminAdded={handleAdminAdded}
        />
      )}

      {/* Update Profile Form */}
      {showUpdateProfileForm && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 center">Update Profile</h2>
            <h3 className="text-base font-semibold mb-2">
              Admin ID: {selectedAdminId}
            </h3>{" "}
            {/* Display the selected admin ID */}
            <form
            // onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-black "
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.emailId}
                  onChange={(e) => handleInputChange("emailId", e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-black "
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange("contactNo", e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-black "
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={closeUpdateProfileForm}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
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
