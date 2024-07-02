import React, { useEffect, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";
import { BiSolidBellRing } from "react-icons/bi";
import Swal from "sweetalert2";
import { Action, Amteklogo } from "@/src/assets/SuperAdmin/header";
import { navbar } from "@/src/utils/SuperAdmin/sidebar";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useRouter } from "next/router";
import { superadminprofile } from "@/src/assets/SuperAdmin/dashboard";
import SADashboard from "@/src/components/SuperAdmin/SaDashboard";
import { reportamtek } from "@/src/assets/SuperAdmin/Sidebar/Index";
import { GoAlertFill } from "react-icons/go";
import socketServcies from "@/src/utils/Socket/socketService"; // Adjust the import path as per your setup
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Responsivesidebar from "./Responsivesidebar";

export default function Header({ open, setOpen }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
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
        socketServcies.disconnect();

        // Remove items from session storage
        sessionStorage.clear();
        localStorage.clear();
        // console.log("Attempting to remove all session items");

        // Check if items were successfully removed
        const authToken = sessionStorage.getItem("authToken");
        const profileData = sessionStorage.getItem("ProfileData");
        const userId = sessionStorage.getItem("userid");
        const adminList = sessionStorage.getItem("adminList");
        const cameraTopic = sessionStorage.getItem("cameraTopic");
        const LSauthToken = localStorage.getItem("LSauthToken");

        if (
          !authToken &&
          !profileData &&
          !userId &&
          !LSauthToken &&
          !cameraTopic &&
          !adminList
        ) {
          // console.log("All session items successfully removed");
        } else {
          // console.log("Failed to remove some session items");
          // if (authToken) console.log("authToken was not removed");
          // if (profileData) console.log("ProfileData was not removed");
          // if (userId) console.log("userid was not removed");
          // if (LSauthToken) console.log("LSauthToken was not removed");
          // if (cameraTopic) console.log("cameraTopic was not removed");
          // if (adminList) console.log("adminList was not removed");
        }

        // Navigate to login page
        router.push("./");
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
  const [notifications, setNotifications] = useState([]);
  const [notificationLength, setNotificationLength] = useState(0);
  const fetchNotificationData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      const API_URL =
        "https://24x7healthcare.live/notification/get?notificationType=All";
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.result);
        setNotificationLength(data.result.length);
      } else {
        console.error(
          "Error fetching notifications data:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching notifications data:", error);
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") {
      return true;
    }
    return (notification as any).notification_type === selectedFilter;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <section className="fixed top-0 w-full z-50">
      <div className="w-full flex p-0 justify-between items-center bg-[#00264D] h-14">
        <span className="flex md:gap-14 gap-0 md:ml-8 ">
          <span
            className="inline-flex ml-[5px] "
            onClick={() => {
              router.push("./dashboard");
            }}
          >
            <span className="bg-white rounded-full p-[3px]  mr-2">
              <img
                src={Amteklogo.src}
                alt=""
                className="w-14 h-10 cursor-pointer block float-left"
              />
            </span>

            <span className={`w-full center duration-300 cursor-pointer`}>
              <span className="h-10 w-1 rounded-full bg-WHITE mr-2"></span>
              <p className="w-full md:text-2xl font-bold text-WHITE">AMTeK</p>
            </span>
          </span>
        </span>

        <div className="flex md:gap-5 gap-1 p-0 justify-end md:m-4 center">
          <a
            href={`https://smartambulance.in/allReport?adminId=${usernamedata}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex center cursor-pointer bg-[#A9CCE2] rounded-md gap-0 p-2"
          >
            <img src={reportamtek.src} className="h-5 w-5" alt="" />
            <h3 className="text-black md:text-base text-[9px] font-bold">
              {" "}
              All Report
            </h3>
          </a>
          <span
            className="flex center cursor-pointer bg-[#A9CCE2] rounded-md gap-1 p-2"
            onClick={handleLogout}
          >
            <h3 className="text-black md:text-base text-xs font-bold">
              Logout
            </h3>
            <IoIosLogOut className="text-black text-lg font-bold" />
          </span>
          <span
            className="h-10 w-10  md:flex  center bg-[#A9CCE2] rounded-full"
            onClick={handleFullscreen}
          >
            {isFullscreen ? (
              <FullscreenExitIcon className="text-black font-bold  text-[39px]" />
            ) : (
              <FullscreenIcon className="text-black font-bold  text-[35px]" />
            )}
          </span>{" "}
          <span
            className="relative h-10 w-10 flex items-center justify-center bg-[#A9CCE2] rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <BiSolidBellRing className="text-black text-2xl" />
            {notificationLength > 0 && (
              <span className="absolute top-0   right-0 h-4 w-auto px-1 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {notificationLength}
              </span>
            )}
          </span>
          {/* //Notification Start */}
          {isOpen && (
            <div className="absolute top-12 right-0 mt-3 w-80 h-[90vh] bg-gray-100 shadow-lg rounded-lg overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="flex justify-between center items-center bg-gray-100 py-2 px-4 border-b">
                  <div>
                    <p className="font-medium">
                      Notifications{" "}
                      <span className="text-red-600 ">
                        ({filteredNotifications.length})
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <select
                      className="mr-4 p-0 border rounded"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="Alcohol">Alcohol</option>
                      <option value="Oxygen">Oxygen</option>
                      <option value="Sos">Sos</option>
                      <option value="Jerk">Jerk</option>
                    </select>
                    <button
                      onClick={toggleDropdown}
                      className="text-blue-500 font-extrabold text-2xl"
                    >
                      &times;
                    </button>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto p-2 custom-scrollbar-ranges">
                  {filteredNotifications && filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification, index) => (
                      <div
                        key={index}
                        className="mt-1 flex px-2 py-0 w-full pl-2 text-left bg-gray-100 rounded-lg"
                      >
                        <div className="w-[20%] flex-col flex center h-auto">
                          <span className="text-xs font-medium text-red-600">
                            {(notification as any).notification_type}
                          </span>
                          <GoAlertFill className="text-red-600" />
                        </div>
                        <div className="w-[80%] p-1 h-auto ml-2">
                          <div className="flex flex-col w-full">
                            <span className="text-xs font-medium">
                              Ambulance ID :{" "}
                              {(notification as any).ambulance_id}
                            </span>
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            Date : {(notification as any).date}{" "}
                            <span className="text-xs font-medium ">
                              {(notification as any).time}
                            </span>
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            Owner : {(notification as any).owner_id}
                          </div>
                          {/* <div className="text-xs font-medium text-gray-700">
                            value : {(notification as any).value}
                          </div> */}
                        </div>
                        <div className="flex center w-[15%]">
                          <span className="bg-WHITE p-1 rounded-full">
                            <img src={Action.src} className="h-5 w-5" alt="" />
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No notifications available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* //Notification end */}
          <div
            className="w-10 h-10 center  hidden  md:mr-0 mr-2 md:flex bg-[#A9CCE2] rounded-full"
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
          <span
            className="w-10 h-10 center flex md:hidden items-center cursor-pointer   md:mr-0 mr-2  bg-[#A9CCE2] rounded-full"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <AiOutlineMenuFold className="text-black text-2xl" />
            ) : (
              <AiOutlineMenuUnfold className="text-black text-2xl" />
            )}
            <Responsivesidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          </span>
        </div>
      </div>
    </section>
  );
}
