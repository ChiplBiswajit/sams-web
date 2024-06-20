import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { navbar } from "@/src/utils/SuperAdmin/sidebar";
import { FaTimes } from "react-icons/fa";
import { userprofile } from "@/src/assets/SuperAdmin/Sidebar/Index";
import { BsMenuButtonWideFill } from "react-icons/bs";

const Responsivesidebar = ({ open, setOpen }: any) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const usernamedata = sessionStorage.getItem("userid");

  return (
    <>
      <div
        className={` fixed inset-0 bg-gray-800 bg-opacity-75 z-40 lg:hidden
     ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-gray-800 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="w-full flex justify-end p-1">

         <FaTimes
            className="text-xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className=" justify-center items-center py-2  text-white flex flex-col border-b  md:hidden">
          <span className={` flex-col  flex  text-black font-bold  `}>
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
                <p className="text-WHITE text-xl">Welcome!</p>
                <p className="w-full text-start text-xl font-bold uppercase font-serif text-[#DCDFFF] ">
                  {usernamedata}
                </p>
              </span>
            </span>
          </span>
        </div>
        <div className="flex flex-col h-screen p-4">
          <span className="flex justify-between center">
            <h2 className="text-xl font-bold ">Menu</h2>
            <BsMenuButtonWideFill className="text-white" />
          </span>

          <div className="overflow-y-auto ">
            <ul className="flex flex-col gap-2 py-2 pb-16 ">
              {navbar.map((item: any) => (
                <li
                  key={item.path}
                  className="w-48 max-h-28 flex flex-col gap-2 items-center p-2 cursor-pointer bg-[#F3F9FC] border-[3px] border-[#A9CCE2] rounded-full hover:bg-gray-100 "
                  style={{ boxShadow: "inset 0px 2px 8px rgba(0, 0, 0, 0.9)" }}
                  onClick={() => handleNavigate(item.path)}
                >
                  <img
                    src={item.icon.src}
                    alt={item.title}
                    className="w-6 h-6"
                  />
                  <span className={`text-base text-black  font-bold flex-1`}>
                    {item.title}
                  </span>
                </li>
              ))}
              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Responsivesidebar;
