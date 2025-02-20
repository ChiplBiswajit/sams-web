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
import { BsMenuButtonWideFill } from "react-icons/bs";
import { userprofile } from "@/src/assets/SuperAdmin/Sidebar/Index";

type prop = {
  title?: string;
  children: ReactElement | ReactElement[];
};

export default function Sidebar({ children, title = "Amtek" }: prop) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const usernamedata = sessionStorage.getItem("userid");

  return (
    <div className="  md:block">
      <Header setOpen={setOpen} />
      <div className=" md:flex h-full min-h-screen">
        {/* /////sidebar div//////////// */}
        <div
          className={`hidden  md:flex bg-[#00264D] md:w-[15%] h-full ease-in-out transition-all duration-300 top-0 left-0`}
        >
          <span className="fixed md:w-[15%]  bg-[#00264D] inline-flex mt-12 flex-col items-start gap-3 p-0 md:h-[calc(100%-3rem)]">
            <span
              className={`text-center flex-col w-full flex duration-300 center pt-5 text-black font-bold`}
            >
              <span
                className="w-full flex gap-3 center "
                onClick={() => {
                  router.push("./profile");
                }}
              >
                <img
                  src={userprofile.src}
                  alt="Profile"
                  className="h-12 w-12 p-[3px] border-2 border-[#DCDFFF] rounded-full cursor-pointer"
                />
                <span>
                  <p className="text-WHITE">Welcome!</p>
                  <p className="w-full text-start font-bold uppercase font-serif text-[#DCDFFF] ">
                    {usernamedata}
                  </p>
                </span>
              </span>
              <span className="w-full flex gap-2 justify-between center bg-[#A9CCE2] px-2 mt-[10%]">
                <p className="text-lg font-extrabold">Options</p>
                <BsMenuButtonWideFill className="" />
              </span>
            </span>
            {/* custom-scrollbar */}

            <div className="flex flex-col gap-2 pb-6 md:pl-[5%] h-full overflow-y-auto hide-scrollbar">
              {navbar.map((item: any) => {
                const isCurrentPage = router.pathname === item.path;

                return (
                  <div
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    onMouseDown={() => setPressedButton(item.id)}
                    onMouseUp={() => setPressedButton(null)}
                    onMouseLeave={() => setPressedButton(null)}
                    className={`w-44 max-h-32 py-3 rounded-full shadow-md text-lg font-semibold flex items-center justify-center transform transition-transform duration-100 ${
                      isCurrentPage
                        ? pressedButton === item.id
                          ? "translate-y-1 bg-[#b2c1e0] border-4 border-[#394152]"
                          : "bg-[#e5f8e8] border-4 border-[#3FFF1B]"
                        : "bg-[#f3f9fc] border-[3px] border-[#A9CCE2]"
                    }`}
                    style={{ boxShadow: 'inset 0px 2px 8px rgba(0, 0, 0, 0.9)' }}
                    
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-2 text-gray-600 center transition-all duration-300 rounded-md ${
                        isCurrentPage ? "font-extrabold" : ""
                        // triangle-arrow
                      }`}
                    >
                      <div className="flex flex-col center cursor-pointer">
                        <span className="block float-left">
                          <img
                            src={item.icon.src}
                            alt={item.title}
                            className="w-6 h-6"
                          />
                        </span>
                        <span className={`text-base text-black font-bold flex-1`}>
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </span>
        </div>
        {/* /////sidebar div//////////// */}

        {/* /////children div//////////// */}
        <div className="flex-1 pt-14 bg-gray-100">
          {children}
        </div>
        {/* /////children div//////////// */}
      </div>
    </div>
  );
}
