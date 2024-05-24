import React, { ReactElement, useState } from "react";
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
import ProtectedRoute from "@/src/pages/ProtectedRoute";
import { BsMenuButtonWideFill } from "react-icons/bs";

type prop = {
  title?: string;
  children: ReactElement | ReactElement[];
};

export default function Sidebar({ children, title = "Amtek" }: prop) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const confirmLogout = await Swal.fire({
        icon: "question",
        title: "Are you sure you want to logout?",
        showCancelButton: true,
        confirmButtonColor: "#01246F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
      });

      if (confirmLogout.isConfirmed) {
        router.push("../../components/Login");
      }
    } catch (error) {
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
    <>
      <Header setOpen={setOpen} />
      <div className="flex h-full min-h-screen ">
        {/* /////sidebar div//////////// */}
        <div
          className={`bg-[#DCDFFF] w-[15%] h-full ease-in-out transition-all duration-300 top-0 left-0 `}
        >
          <span className="fixed w-[15%] bg-[#DCDFFF] inline-flex mt-12 flex-col items-start gap-3 p-0 h-[calc(100%-3rem)]">
            <span
              className={`text-center flex-col  w-full flex duration-300 center  pt-5 text-black font-bold `}
            >
              <span className="w-full flex gap-3 center">
                <img
                  src={superadminprofile.src}
                  alt="Profile"
                  className="h-10 w-10  border border-black rounded-full"
                />
                <span>
                  <p>Welcome!</p>
                  <p className="w-full text-xl text-start font-bold uppercase font-serif   text-[#ff0000]">
                 {usernamedata}
                  </p>
                </span>
              </span>
              <span className="w-full flex gap-2 center pt-2 ">
                <p className="text-lg font-extrabold">Options</p>
                <BsMenuButtonWideFill />
              </span>
            </span>
            {/* custom-scrollbar */}
            <div className="flex flex-col gap-2 pb-6 pl-[5%] h-full overflow-y-auto hide-scrollbar ">
              {navbar.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`bg-white center border-2  rounded-full w-full px-8 py-3 flex items-center space-x-3 shadow-inner shadow-md${
                    router.pathname === item.path
                      ? " bg-[#b2c1e0] border-6 border-[#01339f]"
                      : ""
                  }`}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 text-gray-600 center transition-all duration-300 rounded-md ${
                      router.pathname === item.path
                        ? " font-extrabold triangle-arrow "
                        : ""
                    }`}
                  >
                    <div className="flex flex-col center">
                      <span className="block float-left">
                        <img
                          src={item.icon.src}
                          alt={item.title}
                          className="w-6 h-6"
                        />
                      </span>
                      <span
                        className={`text-base text-black font-medium flex-1 ${
                          router.pathname === item.path ? "text-[#ff0044] " : ""
                        } ${!open && "hidden"}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </span>
        </div>
        {/* /////sidebar div//////////// */}

        {/* /////children div//////////// */}
        <div className="flex-1 pt-14">
          <ProtectedRoute>{children}</ProtectedRoute>
        </div>
        {/* /////children div//////////// */}
      </div>
    </>
  );
}
