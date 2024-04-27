import {
  Air,
  Alcohol,
  Humidityc,
  co,
  insidecard,
  oxygenc,
  temprature,
  totalcard,
  triangle,
  violetback,
  violethalf,
  voc,
} from "@/src/assets/SuperAdmin/fleets";
import {
  airqualitysensor,
  camera,
  co2,
  compound,
  drop,
  jerkvalue,
  map,
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
import { useMediaQuery } from "react-responsive";
import { TbFilterDown } from "react-icons/tb";

import {
  Chart,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale, //x-axis
  LinearScale, //y-axis
  PointElement,
  LineElement, // Add LineElement to the registered elements
  // PolarAreaElement,
  // Add PolarAreaElement to the registered elements
  RadialLinearScale, // Add RadialLinearScale for polar charts
  DoughnutController, // Add DoughnutController for the donut chart
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
  LineElement, // Register LineElement
  // PolarAreaElement, // Register PolarAreaElement
  RadialLinearScale, // Register RadialLinearScale
  DoughnutController // Register DoughnutController
);
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"; // Add this import
import SAJerkdata from "./SAJerkdata";
import LarkAiData from "./LarkAiData";

interface Message {
  location?: {
    latitude: number;
    longitude: number;
  };
}

const LocationData = ({ lat, lng }: any) => {
  const containerStyle = {
    height: "94%",
    width: "100%",
  };

  const center = {
    lat: lat || 0,
    lng: lng || 0,
  };

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },

      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return isLoaded ? (
    <div className="md:h-full md:w-full h-96 ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
      >
        <Marker
          icon={{
            url: "/gps.png",
            scaledSize: { width: 60, height: 60 } as google.maps.Size,
          }}
          position={{
            lat: lat || 0,
            lng: lng || 0,
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default function SALivedata() {
  const [cameraTopic, setCameraTopic] = useState("");

  const [showAmtekData, setShowAmtekData] = useState(true); // State to track which data to show
  // Other state variables and useEffect hooks...

  // Function to toggle between Amtek and Lark AI data
  const toggleData = () => {
    setShowAmtekData(true);
    setShowLarkData(false);
  };

  const [showLarkData, setShowLarkData] = useState(false); // State to track which data to show
  // Other state variables and useEffect hooks...

  // Function to toggle between Amtek and Lark AI data
  const toggleLarkData = () => {
    setShowLarkData(true);
    setShowAmtekData(false);
  };

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
  const storedCameraTopic = sessionStorage.getItem("cameraTopic");
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",storedCameraTopic)

  useEffect(() => {
    <LocationData />;
  }, [alcoholDataState]);

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
        `https://smartambulance.in/admins/getFilterAmbulance?ambulanceType=${filter}`,
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

  useEffect(() => {
    const usernamedata = sessionStorage.getItem("userid");
    // console.log("id---------------------------------", usernamedata);
    storeObjByKey("obj", usernamedata);
    socketServcies.initializeSocket();
    socketServcies.on("received_admin_data", (msg: any) => {
      // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",msg);

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
  }, [filter]);

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
          {/* <div className="bg-[#eceef1] px-2 py-2 rounded-md flex flex-col center">
            <p className="text-sm font-semibold">Total Inactive Ambulance</p>
            <p className="text-sm text-red-600 font-bold">15</p>
          </div> */}
        </div>
        <div className="flex gap-6">
          {/* <select
            className="px-2 py-2 h-10 rounded-md text-black font-semibold center bg-[#ECEEF1]"
            value={filter}
            // onChange={(e) => setFilter(e.target.value)}
          >
            <option
              className="text-black bg-white px-0 py-0 font-semibold text-center"
              value="ALL"
            >
              All ambulance
            </option>
            <option
              className="text-green-600 bg-white font-semibold text-center"
              value="ALS"
            >
              Active
            </option>
            <option
              className="text-red-600 bg-white font-semibold text-center"
              value="BLS"
            >
              Inactive
            </option>
          </select> */}
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
              ALS {/* Ambulance icon */}
            </option>
            <option
              className="text-yellow-600 bg-white text-center font-semibold"
              value="BLS"
            >
              BLS {/* Ambulance icon */}
            </option>
          </select>
        </div>
      </div>
      {loading && <Loader />}
      <section className="md:w-[92%] flex flex-col  h-screen md:h-screen pl-[5%] pt-0 md:pt-2  center ">
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 pb-40 center  justify-center items-start">
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
              // console.log(
              //   "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
              //   ambulanceID
              // );
              // console.log("-----@@@@@@@@@@@@@@@@@@@@------alcohol", alcoholData);
              // console.log(
              //   "------ggggggggggggggggggghvg",
              //   alcoholDataState?.location
              // );

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
                    // loc  = alcoholData?.[item?.ambulanceId]
                    setAmbulanceID(item?.ambulanceId);
                  }}
                >
                  <span className=" absolute">
                    <img
                      src={totalcard.src}
                      alt=""
                      className="md:w-[290px] w-[225px] "
                    />
                  </span>
                  <div className=" flex gap-5 relative  w-[95%]">
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

                    <span className="w-full flex gap-1 p-1 md:ml-[150px] ml-[140px]">
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
                    className="bg-[#ECEEF1] border  border-black relative top-2 text-sm font-semibold text-black md:left-[15rem] p-[3px] rounded-xl left-[105px]"
                    onClick={toggleLarkData}
                  >
                    Vitals
                  </span>
                </div>
              );
            })}
        </div>

        {isOffCanvasOpen && alcoholDataState && (
          <div className=" absolute top-0 right-0 h-full w-full bg-black bg-opacity-15 flex items-center overflow-x-auto overflow-y-auto justify-end ">
            <div className="w-[85%] md:w-[85%] h-full  flex top-14 flex-col absolute bg-white p-4 overflow-y-auto">
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

              {/* Add a button to toggle between Amtek and Lark AI data */}
              <div className="w-full flex gap-5 center py-6">
                <button className={`button`} onClick={toggleData}>
                  <p>Amtek</p>
                </button>
                <button className={`button`} onClick={toggleLarkData}>
                  <p>Vitals</p>
                </button>
              </div>
              {/* .........................amtek data start................................. */}
              {showAmtekData && (
                <>
                  <div className="w-full  gap-3 flex md:flex-row flex-col">
                    <div className="w-full  flex-col flex gap-2 ">
                      <div className="w-full h-96 bg-[#8B95E3] rounded-md  p-1 mt-2">
                        <p className="text-center bg-[#8B95E3] text-white rounded-sm text-sm font-bold capitalize">
                          GPS
                        </p>
                        <span className="h-full w-full">
                          <LocationData
                            className="md:h-full md:w-full h-96"
                            lat={
                              (alcoholDataState as Message)?.location?.latitude
                            }
                            lng={
                              (alcoholDataState as Message)?.location?.longitude
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3  gap-6 md:gap-8">
                      <span className=" w-full ">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className=" w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-2">
                              <img src={oxygen.src} alt="" className="w-8 " />
                            </span>

                            <p className=" text-center text-xs font-bold capitalize">
                              oxygen
                            </p>
                            <p className=" text-center text-xs">
                              {(() => {
                                const oxygenFilterValue = (
                                  alcoholDataState as AlcoholDataState
                                )?.oxygen?.filterValue;
                                const displayedOxygenValue =
                                  typeof oxygenFilterValue === "number"
                                    ? Math.min(
                                        Math.max(oxygenFilterValue, 0),
                                        100
                                      )
                                    : 0; // Set a default value (e.g., 0) if oxygenFilterValue is not a number
                                return displayedOxygenValue + "%";
                              })()}
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-2">
                              <img
                                src={airqualitysensor.src}
                                alt=""
                                className="w-8 "
                              />
                            </span>
                            <p className=" text-center text-xs font-bold capitalize">
                              air quality
                            </p>{" "}
                            <p className=" text-center text-xs">
                              {
                                (alcoholDataState as AlcoholDataState)?.aqi
                                  ?.airIndex
                              }
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-2">
                              <img src={co2.src} alt="" className="w-8" />
                            </span>
                            <p className=" text-center text-xs font-bold capitalize">
                              co2
                            </p>{" "}
                            <p className=" text-center text-xs">
                              {
                                (alcoholDataState as AlcoholDataState)?.aqi
                                  ?.eco2
                              }
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-2">
                              <img src={summer.src} alt="" className="w-8 " />
                            </span>
                            <p className=" text-center text-xs font-bold capitalize">
                              temprature
                            </p>{" "}
                            <p className=" text-center text-xs">
                              {
                                (alcoholDataState as AlcoholDataState)?.aqi
                                  ?.temp
                              }
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-2">
                              <img src={drop.src} alt="" className="w-8 " />
                            </span>
                            <p className=" text-center text-xs font-bold capitalize">
                              humidity
                            </p>{" "}
                            <p className=" text-center text-xs">
                              {
                                (alcoholDataState as AlcoholDataState)?.aqi
                                  ?.humidity
                              }
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-2">
                              <img src={compound.src} alt="" className="w-8 " />
                            </span>
                            <p className=" text-center text-xs font-bold capitalize">
                              VOC
                            </p>{" "}
                            <p className=" text-center text-xs">
                              {(alcoholDataState as AlcoholDataState)?.aqi?.voc}
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <img
                          src={triangle.src}
                          alt=""
                          className="w-32 absolute"
                        />
                        <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                          <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                            <span className=" border-[#8B95E3] rounded-full center pt-0">
                              <img src={testing.src} alt="" className="w-8 " />
                            </span>
                            <p className=" text-center text-xs font-bold capitalize">
                              alcohol
                            </p>{" "}
                            <p className=" text-center text-xs">
                              {
                                (alcoholDataState as AlcoholDataState)?.alcohol
                                  ?.alcoholIndex
                              }
                            </p>
                            <p className=" text-center  text-[10px]">
                              <span className="font-bold"> Alert: </span>
                              {
                                (alcoholDataState as AlcoholDataState)?.alcohol
                                  ?.alert
                              }
                            </p>
                          </div>
                        </div>
                      </span>
                      <span className="w-full">
                        <a
                          href={`http://18.60.124.113:8000/stream?ambulanceId=${storedCameraTopic}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={triangle.src}
                            alt=""
                            className="w-32 absolute"
                          />
                          <div className="w-20 h-24 p-1 rounded-md center bg-[#ffffff] relative top-4 left-[10px]">
                            <div className="w-[72px] h-[88px] center flex flex-col rounded-md bg-[#EBEDFF]">
                              <span className="border-[#8B95E3] rounded-full center pt-0">
                                <img src={camera.src} alt="" className="w-8" />
                              </span>
                              <p className="text-center font-semibold text-xs">
                                Tab to see
                                <p className="text-center text-xs">Livefeed</p>
                              </p>
                              <MdOutlineKeyboardDoubleArrowRight className="" />
                            </div>
                          </div>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="w-full mt-12 ">
                    <SAJerkdata />
                  </div>
                </>
              )}

              {/* .........................amtek data end................................. */}

              {/* .........................Lark ai data start..................................... */}
              {showLarkData && (
                <div>
                  <LarkAiData />
                </div>
              )}
              {/* .........................Lark ai data end..................................... */}
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
