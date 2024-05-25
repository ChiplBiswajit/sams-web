import React, { ReactElement, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { useRouter } from "next/router";
import { navbar } from "@/src/utils/SuperAdmin/sidebar";
import Link from "next/link";
import ProtectedRoute from "@/src/pages/ProtectedRoute";
import { userprofile } from "@/src/assets/SuperAdmin/Sidebar/Index";
import { Amteklogo } from "@/src/assets/SuperAdmin/header";

type prop = {
  title?: string;
  children: ReactElement | ReactElement[];
};
export default function Responsivesidebar({ children, title = "Amtek" }: prop) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const usernamedata = sessionStorage.getItem("userid");

  return (
    <>
      <div className="bg-gray-100 w-full lg:hidden text-white flex justify-between p-4 md:hidden">
      <span
            className=" inline-flex ml-2"
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
              <p className="w-full md:text-xl font-bold text-[#01339F]">AMTeK</p>
            </span>
            {/* <div className="pl-4 md:pl-11">
              <MdMenuOpen
                className={`text-black text-4xl cursor-pointer 
              ${!open && "rotate-180"}`}
                onClick={() => setOpen((open: any) => !open)}
              />
            </div> */}
          </span>
        <MdMenuOpen
          className="text-2xl cursor-pointer"
          onClick={handleMenuToggle}
        />
      </div>
      <div className={`md:flex md:flex-row ${open ? "block" : "hidden"}`}>
        <div className="bg-gray-800 text-white md:w-1/5 h-screen">
          <span className="flex flex-col items-center p-4">
            <img src={userprofile.src} alt="Logo" className="w-20 h-20 mb-2" />
            <p>Welcome, {usernamedata}</p>
          </span>
          <div className="flex flex-col gap-2">
            {navbar.map((item: any) => (
              <Link href={item.path} key={item.id}>
                <span
                  className={`p-2 hover:bg-gray-700 ${
                    router.pathname === item.path ? "bg-gray-700" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:flex-1 md:px-4">
          <ProtectedRoute>{children}</ProtectedRoute>
        </div>
      </div>
    </>
  );
}
