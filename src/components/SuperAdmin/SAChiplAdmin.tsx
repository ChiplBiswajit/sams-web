import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidShow } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const users = [
  { userid: 11, username: "User1", totalFleetAdd: 5 },
  { userid: 21, username: "User2", totalFleetAdd: 8 },
  { userid: 12, username: "User1", totalFleetAdd: 5 },
  { userid: 16, username: "User1", totalFleetAdd: 5 },
  { userid: 27, username: "User2", totalFleetAdd: 8 },
];

export default function SAChiplAdmin() {
  const [formData, setFormData] = useState({
    userId: "",
    userType: "", // default value for select
    name: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    emailId: "",
    gender: "",
  });

  const validationSchema = Yup.object({
    userId: Yup.string().required("User ID is required"),
    userType: Yup.string().required("User Type is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid Mobile Number")
      .required("Mobile Number is required"),
    emailId: Yup.string()
      .email("Invalid email address")
      .required("Email ID is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid Gender")
      .required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
      userType: "",
      name: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      emailId: "",
      gender: "", // Add gender field
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Add your form submission logic here
      closeForm();
    },
  });

  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="h-screen">
      <div className="w-full p-2 flex justify-end ">
        <button
          className="bg-blue-500 flex center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md transition duration-300 transform hover:scale-110"
          id="animatedButton"
          onClick={openForm}
        >
          <IoMdAddCircle className="text-white text-xl" />
          Add Chipl Admins
        </button>
      </div>

      <div className="md:hidden center flex flex-col">
        {users.map((user, index) => (
          <div
            key={index}
            className="m-2 flex bg-[#d0d6e2] w-[90%] rounded-lg p-2"
          >
            <div className="w-[90%]">
              <strong className="text-red-600">Sl No:</strong> {index + 1}
              <br />
              <strong>Fleet Id:</strong> {user.userid}
              <br />
              <strong>Organizational Name:</strong> {user.username}
              <br />
              <strong>Owner Name:</strong> {user.totalFleetAdd}
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
        ))}
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
              Userid
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider"
            >
              No. of Total Fleet Add
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
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.userid}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.username}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap">
                {user.totalFleetAdd}
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
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed top-0 left-0 z-[999] w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-2 rounded-md w-[80%] h-[90%]">
            <div className="flex w-full justify-between items-center gap-2 mb-3">
              <h2 className="text-lg  font-bold  text-center">
                Add Chipl Admins
              </h2>
              <RxCrossCircled
                className=" text-3xl text-center text-red-600"
                onClick={closeForm}
              />
            </div>
            <form onSubmit={formik.handleSubmit} className="p-4 ">
              <div className="w-full flex flex-col h-[70vh]">
                <div className="w-full gap-2 flex md:flex-row flex-col">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="userId"
                      className="block text-sm font-semibold text-gray-600"
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
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.userId && formik.errors.userId
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

                  <div className="mb-4 w-full">
                    <label
                      htmlFor="userType"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      UserType:
                    </label>
                    <select
                      id="userType"
                      name="userType"
                      value={formik.values.userType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.userType && formik.errors.userType
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select UserType
                      </option>
                      <option value=">ChiplAdmin">Chipl Admin</option>
                      <option value="Fleet Admin">Fleet Admin</option>
                    </select>
                    {formik.touched.userType && formik.errors.userType && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.userType}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-2">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-600"
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
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.name && formik.errors.name
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
                  <div className="w-full mb-4">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Gender:
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.gender && formik.errors.gender
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.gender}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-2">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-600"
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
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.password && formik.errors.password
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

                  <div className="mb-4 w-full">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-2">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Mobile Number:
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formik.values.mobileNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.mobileNumber &&
                        formik.errors.mobileNumber
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.mobileNumber &&
                      formik.errors.mobileNumber && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.mobileNumber}
                        </div>
                      )}
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="emailId"
                      className="block text-sm font-semibold text-gray-600"
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
                      className={`mt-1 p-2 w-full border rounded-md ${
                        formik.touched.emailId && formik.errors.emailId
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
              </div>

              <div className="flex justify-center ">
                <button
                  type="button"
                  onClick={closeForm}
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
