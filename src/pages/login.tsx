import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loginpage from "../components/SuperAdmin/Loginpage";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("LSauthToken");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);
  return (
    <>
        <Loginpage />
    </>
  );
}
