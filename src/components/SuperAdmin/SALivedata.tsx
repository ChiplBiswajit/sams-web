import { oxygenc, totalcard, triangle } from "@/src/assets/SuperAdmin/fleets";
import {
  airqualitysensor,
  camera,
  co2,
  compound,
  drop,
  nodata,
  oxygen,
  summer,
  testing,
} from "@/src/assets/SuperAdmin/fleets/offcanvas";
import React, { useEffect, useState } from "react";
import { FaAmbulance } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import socketServcies from "@/src/utils/Socket/socketService";
import { getObjByKey, storeObjByKey } from "@/src/utils/Socket/storage";
import Loader from "../Loader";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/router";
import {
  Chart,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  DoughnutController,
} from "chart.js";
Chart.register(
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  DoughnutController
);
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SAJerkdata from "./SAJerkdata";
import LarkAiData from "./LarkAiData";
import AMTEKdata from "./AMTEKdata";

export default function SALivedata() {
  const router = useRouter();
  const [isvitalCanvasOpen, setIsvitalCanvasOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [res, setRes] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true); // Updated to include loading state
  const [alcoholDataState, setAlcoholDataState] = useState(null);
  const [ambulanceID, setAmbulanceID] = useState();
  const [showLarkData, setShowLarkData] = useState(false); // State to track which data to show
  const [showAmtekData, setShowAmtekData] = useState(true); // State to track which data to show
  const [cameraTopic, setCameraTopic] = useState("");

  const [selectedAdmin, setSelectedAdmin] = useState("");

  const AdminDropdown = () => {
    const [admins, setAdmins] = useState([]);
    const authToken = sessionStorage.getItem("authToken");

    const fetchAdmins = async () => {
      // console.log("777");
      try {
        const response = await fetch(
          "https://0r4mtgsn-3006.inc1.devtunnels.ms/admins/getAdmin",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        // console.log("Fetched data:", data); // Log the data to verify its structure
        setAdmins(data.admin); // Assuming data.admin contains the array of admins
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    useEffect(() => {
      fetchAdmins();
      // console.log("00000000000000000000000000000000");
      // console.log("Updated admins state:", admins); // Log the updated state to verify
    }, []);

    // console.log("22222222222222222222222");
    const handleAdminChange = (event: any) => {
      const adminId = event.target.value;
      setSelectedAdmin(adminId);
      // console.log("hooooooooooooo");
      // onSelectAdmin(adminId); // Call the parent function to notify the selection
    };

    return (
      <div>
        <select id="admins" value=""
                    className="px-2 py-2 h-10 rounded-md text-black font-semibold bg-[#ECEEF1]"
        onChange={handleAdminChange}>
          <option value="">Select an admin </option>
          {admins.map((admin:any) => (
            <option
            className="text-black bg-white  text-center font-semibold"
            key={admin.adminId} value={admin.adminId}>
              {admin.adminId}
            </option>
          ))}
        </select>
        {/* {selectedAdmin && <p>You selected: {selectedAdmin}</p>} */}
      </div>
    );
  };

  useEffect(() => {
    const fetchreportData = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");
        const response = await fetch(
          `https://smartambulance.in/admins/getCameraTopic?ambulanceId=${ambulanceID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        sessionStorage.setItem("cameraTopic", data?.result);
        setCameraTopic(data?.result);
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchreportData();
  }, [ambulanceID]);

  const toggleData = () => {
    setShowAmtekData(true);
    setShowLarkData(false);
  };

  // console.log("999999");

  const toggleLarkData = () => {
    setShowLarkData(true);
    setShowAmtekData(false);
  };

  interface AlcoholDataState {
    oxygen?: {
      filterValue?: string;
    };

    alcohol?: {
      alcoholIndex: string;
      alert: string;
    };

    aqi?: {
      airIndex: string;
      alert: string;
      eco2: string;
      humidity: string;
      temp: string;
      voc: string;
    };
  }

  const openOffCanvas = () => {
    setIsOffCanvasOpen(true);
  };
  const closeOffCanvas = () => {
    setIsOffCanvasOpen(false);
  };

  useEffect(() => {
    if (isOffCanvasOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOffCanvasOpen]);

  const fetchAmbulanceData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      // const filter = ""; // Define your filter here
      const response = await fetch(
        // `https://24x7healthcare.live/v1fetchAmbulanceList/${filter}`,
        // `https://smartambulance.in/admins/getFilterAmbulance?ambulanceType=${filter}`,
        `https://0r4mtgsn-8004.inc1.devtunnels.ms/admins/getFilterAmbulance?ambulanceType=${filter}&adminId=${selectedAdmin}`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      // console.log("amblist", data);
      if (data && data.ambulanceList) {
        setAmbulanceData(data.ambulanceList);
        // console.log("total ambulance list",data.ambulanceList)
        setLoading(false);
      } else {
        // If data is not received after 10 seconds, set loading to false and show "No data available"
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    } catch (error) {
      // console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Pagination logic to slice ambulanceData array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ambulanceData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  useEffect(() => {
    const usernamedata = sessionStorage.getItem("userid");
    storeObjByKey("obj", usernamedata);
    socketServcies.initializeSocket();
    socketServcies.on("received_admin_data", (msg: any) => {
      // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", msg);
      setRes(msg);
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
      }, 10000);
    });
  }, []);

  useEffect(() => {
    fetchAmbulanceData();
  }, []);
  useEffect(() => {
    fetchAmbulanceData();
  }, [filter, selectedAdmin]);

  return (
    <>
      <div className="flex w-full justify-between px-6 py-3 gap-5">
        <div className="flex gap-3">
          <div className="bg-[#eceef1] px-2 py-2 rounded-md flex flex-col center">
            <p className="text-sm font-semibold">Total Ambulance</p>
            <p className="text-sm font-bold">{ambulanceData.length || 0}</p>
          </div>
          <div className="bg-[#eceef1] px-2 py-2 rounded-md flex flex-col center">
            <p className="text-sm font-semibold">Total Active Ambulance</p>
            <p className="text-sm text-green-600 font-bold">
              {(res[0] as any)?.onlineDevice || 0}
            </p>
          </div>
          <div className="bg-[#eceef1] px-2 py-2 rounded-md flex flex-col center">
            <p className="text-sm font-semibold">Total Inactive Ambulance</p>
            <p className="text-sm text-red-600 font-bold">
              {(res[0] as any)?.oflineDevice || 0}
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <AdminDropdown />

          <select
            className="px-2 py-2 h-10 rounded-md text-black font-semibold bg-[#ECEEF1]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option
              className="text-black bg-white  text-center font-semibold"
              value="ALL"
            >
              ALL
            </option>
            <option
              className="text-red-600 bg-white text-center font-semibold"
              value="ALS"
            >
              ALS
            </option>
            <option
              className="text-yellow-600 bg-white text-center font-semibold"
              value="BLS"
            >
              BLS
            </option>
          </select>
        </div>
      </div>

      {/* {loading && <Loader />} */}

      <section className="md:w-[92%] flex flex-col  h-screen md:h-screen pl-[5%] pt-0 md:pt-2   ">
        <div className="w-full  grid grid-cols-2 md:grid-cols-3  gap-4   justify-start items-start">
          {ambulanceData &&
            ambulanceData?.map((item: any) => {
              const alcoholData = res.find(
                (entry) =>
                  (entry[item?.ambulanceId] as { alcohol: string })?.alcohol
              );
              const amtekStatus =
                alcoholData && typeof alcoholData[item.ambulanceId] === "object"
                  ? (alcoholData[item.ambulanceId] as { amtekStatus?: number })
                      .amtekStatus || 0
                  : 0;

              return (
                <div
                  className="w-auto h-auto mb-0 md:mb-7  md:pl-7"
                  key={item?.id}
                  onClick={async () => {
                    // console.log("first");
                    storeObjByKey("obj", item);
                    const dt = await getObjByKey("obj");
                    openOffCanvas();
                    setAlcoholDataState(
                      alcoholData?.[item?.ambulanceId] || null
                    );

                    // console.log("222222222222222222222222222", alcoholData);
                    setAmbulanceID(item?.ambulanceId);
                  }}
                >
                  <span className="absolute">
                    <img
                      src={totalcard.src}
                      alt=""
                      className="md:w-[290px] w-[225px] "
                    />
                  </span>
                  <div className=" flex gap-5 relative  md:w-[290px] w-[225px]">
                    <span className="flex w-full center gap-[2px] ml-3">
                      <span
                        className={`md:h-2 md:w-2 h-1 w-1 rounded-full ${
                          amtekStatus == 1 ? "bg-green-600" : "bg-red-600"
                        }`}
                      ></span>
                      <p
                        className={`md:text-xs text-[10px] ${
                          amtekStatus == 1 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {amtekStatus == 1 ? "Active" : "Inactive"}
                      </p>
                    </span>

                    <span className="w-full flex gap-1 p-1 md:ml-[150px] ml-[110px]">
                      {item.ambulanceType === 1 ? (
                        <span className="center gap-1">
                          <FaAmbulance className="text-red-600 text-xs  md:text-sm" />
                          <p className="md:text-xs text-[8px] font-bold text-white">
                            ALS
                          </p>
                        </span>
                      ) : item.ambulanceType === 2 ? (
                        <span className="center gap-1">
                          <FaAmbulance className="text-yellow-600 text-xs md:text-sm" />
                          <p className="md:text-xs text-[8px] font-bold text-white">
                            BLS
                          </p>
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <span className=" w-auto relative md:top-2 left-1 md:left-2">
                    <p className="md:text-xs text-[10px] text-black font-bold">
                      Ambulance ID
                    </p>
                    <p className="md:text-xs text-[10px] text-[#5B6ADB] font-bold">
                      {item.ambulanceId}
                    </p>
                  </span>
                  <span className=" w-auto relative md:top-5 md:left-3 left-1">
                    <p className="md:text-xs text-[10px] text-black font-bold">
                      OXYGEN
                    </p>
                  </span>
                  <span className=" w-auto relative md:top-[20px] md:left-12 left-8">
                    <img
                      src={oxygenc.src}
                      alt=""
                      className="md:w-10 md:h-10 w-6 h-6 rounded-md"
                    />
                  </span>
                  <span className="w-auto relative md:top-3 md:left-[85px] left-[55px]">
                    {alcoholData && (
                      <p className="md:text-base text-xs  text-[#FF4500] font-bold">
                        {" " +
                          ((alcoholData[item?.ambulanceId] as { oxygen: any })
                            ?.oxygen?.filterValue >= 100
                            ? 100
                            : (
                                alcoholData[item?.ambulanceId] as {
                                  oxygen: any;
                                }
                              )?.oxygen?.filterValue >= 0
                            ? (
                                alcoholData[item?.ambulanceId] as {
                                  oxygen: any;
                                }
                              )?.oxygen?.filterValue
                            : 0) +
                          " "}
                        %
                      </p>
                    )}
                    {!alcoholData && (
                      <p className="md:text-base text-xs text-black font-bold">
                        NA
                      </p>
                    )}
                  </span>
                  <span
                    className="bg-[#ECEEF1] border  border-black relative md:top-2 top-1 md:text-sm  text-xs font-semibold text-black md:left-[15rem] p-[3px] rounded-xl left-[15em]"
                    onClick={toggleLarkData}
                  >
                    Vitals
                  </span>
                </div>
              );
            })}
        </div>

        {isOffCanvasOpen && alcoholDataState && (
          <div className=" absolute top-0 right-0 h-screen w-full bg-black bg-opacity-15 flex items-center overflow-x-auto overflow-y-auto justify-end ">
            <div className="w-[85%] md:w-[85%] bg-WHITE h-full  flex top-14 flex-col absolute  p-4 overflow-y-auto">
              <span className="w-full  mb-2 flex  justify-between center">
                <span
                  className="w-8 h-7 rounded-full center bg-[#7F88CE]"
                  onClick={closeOffCanvas}
                >
                  <ImCross className="text-white text-sm" />
                </span>

                <span className="w-full text-red-600 gap-2 flex center font-bold text-center">
                  <p className=" text-black font-bold">Ambulance ID:</p>
                  {ambulanceID}
                </span>
                <span className="flex">
                  <a
                    href={`https://smartambulance.in/report.html?ambulanceId=${ambulanceID}`}
                    className="button-24"
                  >
                    Report Download
                  </a>
                </span>
              </span>

              <div className="w-full flex gap-5 center py-6">
                <button className={`button`} onClick={toggleData}>
                  <p>Amtek</p>
                </button>
                <button className={`button`} onClick={toggleLarkData}>
                  <p>Vitals</p>
                </button>
              </div>
              {showAmtekData && <AMTEKdata />}

              {showLarkData && (
                <div>
                  <LarkAiData />
                </div>
              )}
            </div>
          </div>
        )}

        {isOffCanvasOpen && !alcoholDataState && (
          <div className="fixed top-14 right-0 h-full w-full bg-black bg-opacity-15 flex items-center justify-end ">
            <div className="w-[85%] md:w-[80%] h-full absolute bg-white p-4 ">
              <span className="w-full flex  justify-between center">
                <span className="w-8 h-8 rounded-full center bg-[#7F88CE]">
                  <ImCross
                    className="text-white text-sm"
                    onClick={closeOffCanvas}
                  />
                </span>

                <span className="w-full text-red-600 gap-2 flex center font-bold text-center">
                  <p className=" text-black font-bold">Ambulance ID:</p>
                  {ambulanceID}
                </span>
              </span>
              <div className="w-full h-full center flex flex-col">
                <img src={nodata.src} alt="" className="w-20 h-20 " />
                <p className="text-xl">No data available for this ambulance.</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
