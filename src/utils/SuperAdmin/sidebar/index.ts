import { SuperAdminnavbar } from "@/src/types/SuperAdmin";
import {
  Aboutus,
  ChiplAdmin,
  dashboard,
  fleets,
  help,
  live,
  profilePage,
  reportamtek,
  stocks,
} from "@/src/assets/SuperAdmin/Sidebar/Index";

export const navbar: SuperAdminnavbar[] = [
  {
    id: 1,
    icon: dashboard,
    title: "Dashboard",
    path: "/SuperAdmin/dashboard",
    pagePath: "dashboard",
  },
  {
    id: 2,
    icon: ChiplAdmin,
    title: "Chipl Admin",
    path: "/SuperAdmin/chiplAdmin",
    pagePath: "ChiplAdmin",
  },
  {
    id: 3,
    icon: fleets,
    title: "Fleets",
    path: "/SuperAdmin/fleets",
    pagePath: "Fleets",
  },
  {
    id: 4,
    icon: stocks,
    title: "Stocks",
    path: "/SuperAdmin/stocks",
    pagePath: "Stocks",
  },
  {
    id: 5,
    icon: live,
    title: "Live Data",
    path: "/SuperAdmin/liveData",
    pagePath: "LiveData",
  },
  {
    id: 9,
    icon: reportamtek,
    title: "Report",
    path: "https://24x7healthcare.live/allReport",
    pagePath: "report",
  },
  {
    id: 6,
    icon: profilePage,
    title: "Profile",
    path: "/SuperAdmin/profile",
    pagePath: "Profile",
  },
  {
    id: 7,
    icon: help,
    title: "Help",
    path: "/SuperAdmin/help",
    pagePath: "Help",
  },
  {
    id: 8,
    icon: Aboutus,
    title: "About Us",
    path: "/SuperAdmin/About_Us",
    pagePath: "About_Us",
  },
];
