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
import Header from "./Header";
import Link from "next/link";
type prop = {
  title?: string;
  children: ReactElement | ReactElement[];
};
export default function Sidebar({ children, title = "Amtek" }: prop) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

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
      console.error("Fullscreen not supported by your browser");
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
        console.log("Logout clicked");

        router.push("../../components/Login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred during logout. Please try again.",
        confirmButtonColor: "#01246F",
      });
    }
  };

  return (
    <>
      <Header setOpen={setOpen} />
      <div className="flex h-auto md:h-auto ">
        <div
          className={`bg-[#DCDFFF]  p-2 pt-3 w-60 ${
            open ? "w-60" : "w-[80px]"
          } ease-in-out transition-all duration-300  top-0 left-0 `}
        >
          <span className="fixed inline-flex mt-14 p-2">
            <img
              src={superadminprofile.src}
              alt="loading..."
              className="h-10 w-10 md:mr-4 mr-2 border border-black rounded-full "
            />

            <span
              className={`w-full duration-300 center flex flex-col  ${
                !open && "scale-0"
              }`}
            >
              <p className="w-full text-sm font-bold text-black">Welcome!</p>
              <p className="w-full text-base font-bold text-gray-500">Admin</p>
            </span>
          </span>
          <span
            className={`fixed inline-flex mt-28 flex-col items-start gap-3 p-2`}
          >
            <text
              className={`text-start  duration-300 text-gray-500 font-bold 
     ${!open && "hidden"}
     `}
            >
              MENU
            </text>

            {navbar.map((item: any) => (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center gap-2 pl-2 text-gray-600 transition-all duration-300 rounded-md 
                ${router.pathname === item.path ? "bg-white p-2 " : ""}`}
              >
                <span className="block float-left">
                  <img
                    src={item.icon.src}
                    alt={item.title}
                    className="w-5 h-5"
                  />
                </span>

                <span
                  className={`text-sm text-black font-medium flex-1  ${
                    router.pathname === item.path ? "text-red-700 " : ""
                  }  ${!open && "hidden"} `}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </span>
        </div>
        <div className="w-full h-auto pt-14 ">
          <>{children}</>
        </div>
      </div>
    </>
  );
}
