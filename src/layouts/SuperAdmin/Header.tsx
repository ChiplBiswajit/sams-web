import React, { Children, ReactElement, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";
import { BiSolidBellRing } from "react-icons/bi";
import Swal from "sweetalert2";
import { Amteklogo } from "@/src/assets/SuperAdmin/header";
import { navbar } from "@/src/utils/SuperAdmin/sidebar";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useRouter } from "next/router";
import { superadminprofile } from "@/src/assets/SuperAdmin/dashboard";
import SADashboard from "@/src/components/SuperAdmin/SaDashboard";
import { reportamtek } from "@/src/assets/SuperAdmin/Sidebar/Index";
type prop = {
  title?: string;
  children: ReactElement | ReactElement[];
};

export default function Header({ open, setOpen }: any) {
  const router = useRouter();
  // const [open, setOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    // Check if fullscreen mode is available
    if (document.fullscreenEnabled) {
      // Toggle fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      // console.error("Fullscreen not supported by your browser");
    }
  };

  const handleLogout = async () => {
    try {
      // Display confirmation prompt
      const confirmLogout = await Swal.fire({
        icon: "question",
        title: "Are you sure you want to logout?",
        showCancelButton: true,
        confirmButtonColor: "#01246F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
      });

      // Check if the user confirmed the logout
      if (confirmLogout.isConfirmed) {
        // console.log("Logout clicked");

        // Simulate a delay (replace with your actual logout logic)
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("./login");
      }
    } catch (error) {
      // console.error("Logout failed:", error);

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred during logout. Please try again.",
        confirmButtonColor: "#01246F",
      });
    }
  };

  const usernamedata = sessionStorage.getItem("userid");

  return (
    <section className="fixed top-0 w-full z-50">
      <div className="w-full flex p-0  justify-between items-center bg-[#DCDFFF] h-14">
        <span className="flex gap-16 ml-8 ">
          <span className=" inline-flex ml-2"
          onClick={() => {
            router.push("./dashboard");
          }}
          >
            <img
              src={Amteklogo.src}
              alt=""
              className="w-auto h-10 cursor-pointer block float-left"
            />
            <span className={`w-full center duration-300`}>
              <span className="h-10 w-1 rounded-full bg-[#01339F] mr-3"></span>
              <p className="w-full text-xl font-bold text-[#01339F]">AMTeK</p>
            </span>
            <div className="pl-4 md:pl-11">
              <MdMenuOpen
                className={`text-black text-4xl cursor-pointer 
              ${!open && "rotate-180"}`}
                onClick={() => setOpen((open: any) => !open)}
              />
            </div>
          </span>
        </span>

        <div className="flex gap-5 justify-end m-4 center">
          <a
            href={`https://smartambulance.in/allReport?adminId=${usernamedata}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex center cursor-pointer bg-[#B2C1E0] rounded-md gap-1 p-2"
          >
            <img src={reportamtek.src} className="h-5 w-5" alt="" />
            <h3 className="text-black text-md font-bold"> All Report</h3>
          </a>
          <span
            className="flex center cursor-pointer bg-[#B2C1E0] rounded-md gap-1 p-2"
            onClick={handleLogout}
          >
            <h3 className="text-black text-md font-bold">Logout</h3>
            <IoIosLogOut className="text-black text-lg font-bold" />
          </span>
          <span
            className="h-10 w-10 flex center bg-[#B2C1E0] rounded-full"
            onClick={handleFullscreen}
          >
            {isFullscreen ? (
              <FullscreenExitIcon className="text-black font-bold  text-[39px]" />
            ) : (
              <FullscreenIcon className="text-black font-bold  text-[35px]" />
            )}
          </span>{" "}
          <span className="h-10 w-10 flex center bg-[#B2C1E0] rounded-full">
            <BiSolidBellRing className="text-black text-lg cursor-pointer " />
          </span>
          <div
            className="w-10 h-10  center bg-white rounded-full"
            onClick={() => {
              router.push("./profile");
            }}
          >
            <img
              src={superadminprofile.src}
              alt="loading..."
              className="w-9 h-9 "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
