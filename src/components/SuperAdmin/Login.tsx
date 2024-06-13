import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import { BG1, BG2, BG3, loginpageimg } from "../../assets/Login";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import Loader from "../Loader";
import { useSetRecoilState } from "recoil"; // Import Recoil components
import { authState } from "../../utils/Recoil/authState"; // Import your Recoil atom for auth state
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_-]{3,16}$/,
      "Invalid username format. Use only letters, numbers, hyphens, and underscores."
    ),
  password: Yup.string().required("Password is required"),
});

const PasswordField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant="filled"
      sx={{ m: 0, width: "30ch" }}
      className="bg-transparent rounded-md"
    >
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <FilledInput
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 mt-2 bg-transparent">{meta.error}</p>
      ) : null}
    </FormControl>
  );
};

const UsernameField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <FormControl
      variant="filled"
      sx={{ m: 0, width: "30ch" }}
      className="bg-transparent rounded-md"
    >
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <FilledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="text-red-500 mt-2 bg-transparent">{meta.error}</p>
      ) : null}
    </FormControl>
  );
};

export default function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuth = useSetRecoilState(authState); // Get setter function for auth state

  const handleLogin = async (values: any, { setSubmitting }: any) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });

      // const apiUrl = "https://samsapi.smartambulance.in/users/login";
         const apiUrl = "https://sams.24x7healthcare.live/users/login";

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

        if (!response.ok) {
          throw new Error(`Login failed. Status: ${response.status}`);
        }

        const data = await response.json();

        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("ProfileData", JSON.stringify(data.profile));
        sessionStorage.setItem("userid", data.profile.userId);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You are now logged in.",
          confirmButtonColor: "#01246F",
          timer: 1500,
        });

        router.push("./dashboard");

        setSubmitting(false);
        setIsSubmitting(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password.",
          confirmButtonColor: "#01246F",
        });

        setSubmitting(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  // <section className='w-full main-container my-12 flex flex-col items-center justify-center gap-6 bg-center bg-no-repeat ' style={{ backgroundImage: `url(${bgmenuImg.src})` }}>

  return (
    <section className= 'w-full h-screen md:h-[100vh] center bg-[#A9CCE2] bg-center bg-no-repeat' 
    style={{ backgroundImage: `url(${BG1.src})` }}
    >
      <div className="  flex md:flex-row flex-col bg-white bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-2xl md:p-0 p-6 shadow-2xl overflow-hidden">
        <div className="w-full h-auto p-5 flex flex-col ">
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={loginpageimg.src}
              alt=""
              className="h-[35vh] md:w-[100vh] md:h-[85vh]"
            />
          </div>
        </div>

        <div className="w-full h-auto ml-[3%] justify-center items-center md:items-start flex flex-col ">
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
            <Form className="w-full flex flex-col md:items-start center">
              <span className="mt-4 w-full md:items-start center flex flex-col">
                <UsernameField label="Username" name="username" id="username" />
              </span>

              <span className="mt-4 w-full md:items-start center flex flex-col">
                <PasswordField label="Password" name="password" id="password" />
              </span>

              <span className="w-[50%] center">
                <button
                  type="submit"
                  className="mt-8 text-center bg-[#01246F] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-105"
                  disabled={isSubmitting}
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