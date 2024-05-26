import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidShow } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import Loader from "../Loader";
import Swal from "sweetalert2";

interface SAAddAdminProps {
  toggleForm: () => void; // Define the toggleForm prop
  setFormikFunction: (formikFunc: any) => void; // Add this prop
}

export default function SAAddAdmin({ toggleForm }: SAAddAdminProps,) {
  //add form details
  const [showForm, setShowForm] = useState(false);


  const validationSchema = Yup.object({
    userId: Yup.string().required("User ID is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    contactNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid Mobile Number")
      .required("Mobile Number is required"),
    emailId: Yup.string()
      .email("Invalid email address")
      .required("Email ID is required"),
    organizationName: Yup.string().required("Organization Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
      name: "",
      password: "",
      contactNo: "",
      emailId: "",
      organizationName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // { resetForm }
      try {
        const authToken = sessionStorage.getItem("authToken");
        const response = await axios.post(
          // "https://samsapi.smartambulance.in/users/add",
          // "https://0r4mtgsn-3006.inc1.devtunnels.ms/users/add",
          "https://sams.24x7healthcare.live/users/add",
          {
            userId: values.userId,
            name: values.name,
            password: values.password,
            contactNo: values.contactNo,
            emailId: values.emailId,
            organizationName: values.organizationName,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        resetForm();
        // console.log("Response:", response.data); // You can handle the response as per your requirement
        Swal.fire({
          icon: "success",
          title: "Admin added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowForm(false);
      } catch (error) {
        // console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to add admin",
          text: "Something went wrong. Please try again later.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });

  // useEffect(() => {
  //   setFormikFunction(formik); // Pass the formik function to the parent component
  // }, [formik, setFormikFunction]);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  return (
    <div className="fixed top-0 left-0 z-[999] w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-2 rounded-md w-[80%] h-auto">
        <div className="flex w-full justify-between items-center gap-2 mb-3">
          <h2 className="text-lg  font-bold  text-center">Add Chipl Admins</h2>
          <RxCrossCircled
            className=" text-3xl text-center text-red-600"
            onClick={toggleForm}
          />
        </div>
        <form onSubmit={formik.handleSubmit} className="p-4 ">
          <div className="w-full grid grid-cols-3 gap-2 h-auto">

            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-sm font-semibold text-black"
              >
                User ID:
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-2 w-full border rounded-md ${formik.touched.userId && formik.errors.userId
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.userId && formik.errors.userId && (
                <div className="text-red-500 text-sm">
                  {formik.errors.userId}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-black"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-2 w-full border rounded-md ${formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-black"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-2 w-full border rounded-md ${formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="organizationName"
                className="block text-sm font-semibold text-black"
              >
                Organization Name:
              </label>
              <input
                type="organizationName"
                id="organizationName"
                name="organizationName"
                value={formik.values.organizationName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-2 w-full border rounded-md ${formik.touched.organizationName &&
                  formik.errors.organizationName
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.organizationName &&
                formik.errors.organizationName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.organizationName}
                  </div>
                )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactNo"
                className="block text-sm font-semibold text-black"
              >
                Mobile Number:
              </label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                value={formik.values.contactNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-2 w-full border rounded-md ${formik.touched.contactNo && formik.errors.contactNo
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.contactNo && formik.errors.contactNo && (
                <div className="text-red-500 text-sm">
                  {formik.errors.contactNo}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="emailId"
                className="block text-sm font-semibold text-black"
              >
                Email ID:
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-2 w-full border rounded-md ${formik.touched.emailId && formik.errors.emailId
                  ? "border-red-500"
                  : ""
                  }`}
              />
              {formik.touched.emailId && formik.errors.emailId && (
                <div className="text-red-500 text-sm">
                  {formik.errors.emailId}
                </div>
              )}
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
      </div >
    </div >
  );
}
