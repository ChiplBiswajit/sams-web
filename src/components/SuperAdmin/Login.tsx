import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginpageimg } from "../../assets/Login";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Loader from "../Loader";
import { RecoilRoot, useSetRecoilState } from "recoil"; // Import Recoil components
import { authState } from '../../utils/Recoil/authState'; // Import your Recoil atom for auth state



const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_-]{3,16}$/,
      "Invalid username format. Use only letters, numbers, hyphens, and underscores."
    ),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuth = useSetRecoilState(authState); // Get setter function for auth state

  const handleLogin = async (
    values: { username: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });

      // API endpoint
      const apiUrl = "https://sams.24x7healthcare.live/users/login";
      // const apiUrl = "https://24x7healthcare.live/adminLogin";

      console.log("Username:", values.username);
      console.log("Password:", values.password);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: values.username,
            password: values.password,
          }),
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
          throw new Error(`Login failed. Status: ${response.status}`);
        }

        const data = await response.json();

        // Store the token in session storage
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("ProfileData", JSON.stringify(data.profile)); // Assuming profile data is available in 'data.profile'

        console.log("API Response Data:", data);
        console.log("Profile Data:", data.profile);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You are now logged in.",
          confirmButtonColor: "#01246F",
          timer: 1500,
        });

        router.push("./dashboard");
        
        setAuth(true); // Set auth state to true upon successful login
        setSubmitting(false);
        setIsSubmitting(false); // Set loading state to false after form submission
      } catch (error) {
        console.error("Login failed:", error);

        if (error instanceof Error) {
          console.log("Error Message:", error.message);
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password.",
          confirmButtonColor: "#01246F",
        });

        setSubmitting(false);
        setIsSubmitting(false); // Set loading state to false in case of validation error
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full h-screen md:h-[100vh] center bg-[#DCDFFF]">
      <div className="  flex md:flex-row flex-col bg-black bg-opacity-10 rounded-2xl md:p-0 p-6">
        <div className="w-full h-auto p-5 flex flex-col ">
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={loginpageimg.src}
              alt=""
              className=" h-[35vh]  md:w-[100vh] md:h-[85vh]"
            />
          </div>
        </div>

        <div className="w-full h-auto  justify-center items-center md:items-start flex flex-col ">
          <span className="md:text-5xl text-3xl font-bold text-[#100B1D]">
            Welcome to AMTeK
          </span>
          <span className="md:text-lg text-sm text-start font-semibold text-[#100B1D]">
            Innovating emergencies, one kit at a time.
          </span>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form className="w-full flex flex-col  md:items-start center ">
              <span className="mt-8 flex flex-col">
                <label className="text-lg text-[#100B1D] font-bold">
                  User ID
                </label>

                <Field
                  type="text"
                  name="username"
                  className="border-2 border-blue-400  p-2 w-full rounded-xl"
                />
                <ErrorMessage name="username">
                  {(msg) => (
                    <p className="text-red-500 mt-2">
                      {msg.includes("required") ? "Username is required" : msg}
                    </p>
                  )}
                </ErrorMessage>
              </span>

              <span className="mt-4 w-full md:items-start center flex flex-col">
                <span className=" flex flex-col md:ml-0 ml-5">
                  <label className="text-lg  text-[#100B1D] font-bold">
                    Password
                  </label>

                  <div className="flex items-center">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="border-2 w-full  border-blue-400 p-2 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-xl focus:outline-none  "
                    >
                      {showPassword ? (
                        <BsFillEyeSlashFill />
                      ) : (
                        <BsFillEyeFill />
                      )}
                    </button>
                  </div>
                </span>

                <ErrorMessage name="password">
                  {(msg) => (
                    <p className="text-red-500 mt-2">
                      {msg.includes("required") ? "Password is required" : msg}
                    </p>
                  )}
                </ErrorMessage>
              </span>

              <span className="w-[40%]  center ">
                <button
                  type="submit"
                  className="mt-8   text-center bg-[#01246F] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  hover:scale-105"
                  disabled={isSubmitting} // Disable the button when submitting
                >
                  {isSubmitting ? <Loader /> : "Login"}
                </button>
              </span>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}
