
import { useEffect } from "react";
import { Amteklogo } from "../assets/SuperAdmin/header";

export default function FlashScreen() {
    useEffect(() => {
        const hideFlashScreen = () => {
          const flashScreen = document.getElementById("flash-screen");
          if (flashScreen) {
            flashScreen.classList.add("animate-zoom-out"); // Add the animation class
            setTimeout(() => {
              flashScreen.style.display = "none";
            }, 500); // Adjust the duration as needed
          }
        };
    
        const timeoutId = setTimeout(hideFlashScreen, 1000);
        return () => clearTimeout(timeoutId);
      }, []);
  return (
    <div
      id="flash-screen"
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      <span className="bg-white flex rounded-full overflow-hidden">
        <img
          src={Amteklogo.src}
          alt=""
          className="w-full h-56 transition-transform animate-zoom-in"
        />
      </span>
      <span className="text-[#100B1D] text-7xl font-bold capitalize animate-zoom-in">
        AMTeK
      </span>
    </div>
  )
}
