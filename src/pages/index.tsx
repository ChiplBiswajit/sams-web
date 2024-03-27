import { RecoilRoot } from "recoil";
import Error from "../components/Error";
import FlashScreen from "../components/FlashScreen";
import Login from "../components/SuperAdmin/Login";

export default function Home() {
  return (
    <>
      <FlashScreen />
      <Login />
    </>
  );
}
