import { SuperAdminnavbar } from "@/src/types/SuperAdmin";
import {
  Aboutus,
  ChiplAdmin,
  dashboard,
  fleets,
  help,
  history,
  jerk,
  live,
  location,
  maintenance,
  profilePage,
  reportamtek,
  stocks,
} from "@/src/assets/SuperAdmin/Sidebar/Index";
import { camera } from "@/src/assets/SuperAdmin/fleets/offcanvas";
// const usernamedata = sessionStorage.getItem("userid");

export const navbar: SuperAdminnavbar[] = [
  {
    id: 1,
    icon: dashboard,
    title: "Dashboard",
    path: "/dashboard",
    pagePath: "dashboard",
  },

  {
    id: 5,
    icon: live,
    title: "Live Data",
    path: "/liveData",
    pagePath: "LiveData",
  },

  {
    id: 11,
    icon: location,
    title: "Location",
    path: "/location",
    pagePath: "location",
  },

  {
    id: 2,
    icon: ChiplAdmin,
    title: "Admin",
    path: "/admin",
    pagePath: "admin",
  },

  {
    id: 9,
    icon: maintenance,
    title: "Maintenance",
    path: "/maintenance",
    pagePath: "Maintenance",
  },
  {
    id: 10,
    icon: history,
    title: "Data History",
    path: "/datahistory",
    pagePath: "datahistory",
  },

  {
    id: 6,
    icon: profilePage,
    title: "Profile",
    path: "/profile",
    pagePath: "Profile",
  },

  // {
  //   id: 3,
  //   icon: fleets,
  //   title: "Fleets",
  //   path: "/fleets",
  //   pagePath: "Fleets",
  // },
  // {
  //   id: 4,
  //   icon: stocks,
  //   title: "Stocks",
  //   path: "/stocks",
  //   pagePath: "Stocks",
  // },

  // {
  //   id: 10,
  //   icon: jerk,
  //   title: "Jerk",
  //   path: "/SuperAdmin/jerk",
  //   pagePath: "jerk",
  // },

  // {
  //   id: 13,
  //   icon: camera,
  //   title: "Camera",
  //   path: "/camera",
  //   pagePath: "camera",
  // },
  // {
  //   id: 9,
  //   icon: reportamtek,
  //   title: "Report",
  //   path: "{`https://0r4mtgsn-3004.inc1.devtunnels.ms/allReport?adminId=${usernamedata}`}",
  //   pagePath: "report",
  // },

  // {
  //   id: 7,
  //   icon: help,
  //   title: "Help",
  //   path: "/help",
  //   pagePath: "Help",
  // },
  {
    id: 8,
    icon: Aboutus,
    title: "About Us",
    path: "/About_Us",
    pagePath: "About_Us",
  },
  // {
  //   id: 9,
  //   icon: Aboutus,
  //   title: "Hams Login",
  //   path: "/hamslogin",
  //   pagePath: "hamslogin",
  // },
];
