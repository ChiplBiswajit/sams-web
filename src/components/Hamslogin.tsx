import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const errorCode = " Unauthorized ";
const errorMessage =
  "The page you are looking for might have been removed had its name changed or its temporary unavailable.";

const Hamslogin = ({ username, password }: any) => {
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  // const [username, setUsername] = useState(""); // Define or set the initial value
  // const [password, setPassword] = useState(""); // Define or set the initial value

  const handleLogin = async (params: any, abortController: any) => {
    try {
      const { username, password } = params;

      // Replace with the actual API endpoint
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT ||
          "https://0r4mtgsn-3006.inc1.devtunnels.ms/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: username,
            password: password,
          }),
          signal: abortController.signal,
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "SAMS Login Successful!",
          text: "Redirecting to the Livedata...",
          timer: 1500,
        }).then(() => {
          router.push("/liveData");
        });
      } else {
        // Handle non-successful response (e.g., show error message)
        console.error("Login failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    // Call handleLogin with the desired params when the component mounts
    handleLogin({ username: username, password: password }, abortController);

    // Cleanup function
    return () => abortController.abort();
  }, [username, password]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 justify-center bg-gray-100">
      {loginFailed && (
        <>
          <p className="text-7xl font-bold text-centre"> Oops!</p>
          <h1 className="text-4xl font-medium text-black mb-2">{errorCode}</h1>
          <p className="text-gray-700 w-[30%] text-center">{errorMessage}</p>
        </>
      )}
    </div>
  );
};

export default Hamslogin;
