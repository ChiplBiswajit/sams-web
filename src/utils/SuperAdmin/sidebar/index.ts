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
    title: "Admin List",
    path: "/admin ",
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

  // {
  //   id: 6,
  //   icon: profilePage,
  //   title: "Profile",
  //   path: "/profile",
  //   pagePath: "Profile",
  // },

  {
    id: 8,
    icon: Aboutus,
    title: "About Us",
    path: "/About_Us",
    pagePath: "About_Us",
  },

];
