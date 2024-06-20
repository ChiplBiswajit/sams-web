import { useRouter } from "next/router";
import Error from "../components/Error";
import FlashScreen from "../components/FlashScreen";
import { useEffect } from "react";
import Loginpage from "../components/SuperAdmin/Loginpage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("LSauthToken");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);
  return (
    <>
      <FlashScreen />
      <Loginpage />   
       </>
  );
}
