import React, { useEffect, useState } from "react";
import SAJerkdata from "./SAJerkdata";
import { Chart } from "react-google-charts";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { triangle } from "@/src/assets/SuperAdmin/fleets";
import {
  airqualitysensor,
  co2,
  compound,
  drop,
  oxygen,
  summer,
  testing,
  camera,
} from "@/src/assets/SuperAdmin/fleets/offcanvas";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import socketServcies from "@/src/utils/Socket/socketService";

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


interface Atom {
  latitude?: number;
  longitude?: number;
}

interface OxygenData {
  filterValue?: number;
}

interface AqiData {
  airIndex?: number;
  eco2?: number;
  temp?: number;
  humidity?: number;
  voc?: number;
}

interface AlcoholData {
  alcoholIndex?: number;
  alert?: string;
}

interface AmtekData {
  atoms?: Atom[];
  oxygen?: OxygenData[];
  aqi?: AqiData[];
  alcohol?: AlcoholData[];
}

export default function AMTEKdata() {
  const [amtekres, setAmtekRes] = useState<AmtekData[]>([]);

  const [jerkres, setJerkRes] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const chartData = [
    ["Time", "Jerk"],
    ...(Array.isArray(jerkres)
      ? jerkres.map((value, index) => [getCurrentTime(), value])
      : []),
  ];

  useEffect(() => {
    socketServcies.initializeSocket();
    socketServcies.on("received_message", (msg: any) => {
          // socketServcies.on("received_admin_data", (msg: any) => {

      // console.log("Received AMTEK VALUE Message :", msg    ); // Log msg here
      try {
        let parsedMsg = msg;
        if (typeof msg === "string") {
          parsedMsg = JSON.parse(msg);
        }
        setAmtekRes(parsedMsg);

        setJerkRes(JSON.parse(msg?.alcohol[0]?.jerkValue));
      } catch (error) {
        // console.error("Error parsing message:", error);
      }
    });
  }, []);

  // console.log("Received AMTEK VALUE Message :", amtekres); // Log msg here

  useEffect(() => {
    <LocationData />;
  }, []);

  const storedCameraTopic = sessionStorage.getItem("cameraTopic");

  return (
    <div>
      <div className="w-full  gap-3 flex md:flex-row flex-col">
        <div className="w-full  flex-col flex gap-2 ">
          <div className="w-full h-96 bg-LAVENDER rounded-md  p-1 mt-2">
            <p className="text-center bg-LAVENDER text-white rounded-sm text-sm font-bold capitalize">
              GPS
            </p>
            <span className="h-full w-full">
              <LocationData
                className="md:h-full md:w-full h-96"
                lat={
                  amtekres &&
                  (amtekres as any)?.atoms &&
                  (amtekres as any)?.atoms[0] &&
                  (amtekres as any)?.atoms[0]?.latitude
                    ? (amtekres as any)?.atoms[0]?.latitude
                    : 0
                }
                lng={
                  amtekres &&
                  (amtekres as any)?.atoms &&
                  (amtekres as any)?.atoms[0] &&
                  (amtekres as any)?.atoms[0]?.longitude
                    ? (amtekres as any)?.atoms[0]?.longitude
                    : 0
                }
              />
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-3  gap-6 md:gap-8">
          <span className=" w-full ">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className=" w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-2">
                  <img src={oxygen.src} alt="" className="w-8 " />
                </span>

                <p className=" text-center text-xs font-bold capitalize">
                  oxygen
                </p>
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any).oxygen &&
                  (amtekres as any).oxygen[0] &&
                  (amtekres as any).oxygen[0].filterValue
                    ? (amtekres as any).oxygen[0].filterValue
                    : 0}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-2">
                  <img src={airqualitysensor.src} alt="" className="w-8 " />
                </span>
                <p className=" text-center text-xs font-bold capitalize">
                  air quality
                </p>{" "}
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any).aqi &&
                  (amtekres as any)?.aqi[0] &&
                  (amtekres as any)?.aqi[0]?.airIndex
                    ? (amtekres as any)?.aqi[0]?.airIndex
                    : 0}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-2">
                  <img src={co2.src} alt="" className="w-8" />
                </span>
                <p className=" text-center text-xs font-bold capitalize">co2</p>{" "}
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any)?.aqi &&
                  (amtekres as any)?.aqi[0] &&
                  (amtekres as any)?.aqi[0]?.eco2
                    ? (amtekres as any)?.aqi[0]?.eco2
                    : 0}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-2">
                  <img src={summer.src} alt="" className="w-8 " />
                </span>
                <p className=" text-center text-xs font-bold capitalize">
                  temprature
                </p>{" "}
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any)?.aqi &&
                  (amtekres as any)?.aqi[0] &&
                  (amtekres as any)?.aqi[0]?.temp
                    ? (amtekres as any)?.aqi[0]?.temp
                    : 0}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-2">
                  <img src={drop.src} alt="" className="w-8 " />
                </span>
                <p className=" text-center text-xs font-bold capitalize">
                  humidity
                </p>{" "}
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any)?.aqi &&
                  (amtekres as any)?.aqi[0] &&
                  (amtekres as any)?.aqi[0]?.humidity
                    ? (amtekres as any)?.aqi[0]?.humidity
                    : 0}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-2">
                  <img src={compound.src} alt="" className="w-8 " />
                </span>
                <p className=" text-center text-xs font-bold capitalize">VOC</p>{" "}
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any)?.aqi &&
                  (amtekres as any)?.aqi[0] &&
                  (amtekres as any)?.aqi[0]?.voc
                    ? (amtekres as any)?.aqi[0]?.voc
                    : 0}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <img src={triangle.src} alt="" className="w-32 absolute" />
            <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
              <div className="w-[72px] h-[88px]  rounded-md bg-[#EBEDFF]">
                <span className=" border-LAVENDER rounded-full center pt-0">
                  <img src={testing.src} alt="" className="w-8 " />
                </span>
                <p className=" text-center text-xs font-bold capitalize">
                  alcohol
                </p>{" "}
                <p className=" text-center text-xs">
                  {amtekres &&
                  (amtekres as any)?.alcohol &&
                  (amtekres as any)?.alcohol[0] &&
                  (amtekres as any)?.alcohol[0]?.alcoholIndex
                    ? (amtekres as any)?.alcohol[0]?.alcoholIndex
                    : 0}
                </p>
                <p className=" text-center  text-[10px]">
                  <span className="font-bold"> Alert: </span>
                  {amtekres &&
                  (amtekres as any)?.alcohol &&
                  (amtekres as any)?.alcohol[0] &&
                  (amtekres as any)?.alcohol[0]?.alert
                    ? (amtekres as any)?.alcohol[0]?.alert
                    : "N/A"}{" "}
                </p>
              </div>
            </div>
          </span>
          <span className="w-full">
            <a
              href={`${storedCameraTopic}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={triangle.src} alt="" className="w-32 absolute" />
              <div className="w-20 h-24 p-1 rounded-md center bg-WHITE relative top-4 left-[10px]">
                <div className="w-[72px] h-[88px] center flex flex-col rounded-md bg-[#EBEDFF]">
                  <span className="border-LAVENDER rounded-full center pt-0">
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
        {/* <SAJerkdata /> */}
        <div className=" w-full bg-LAVENDER p-1 rounded-md">
          <h1 className="text-xl text-center py-1 text-white font-bold w-full underline-offset-2 ">
            Jerk Graph
          </h1>
          <Chart
            // className="p-5"
            width={"100%"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              hAxis: {
                title: "Time",
              },
              vAxis: {
                title: "Jerk",
              },
              chartArea: { width: "70%", height: "70%" },
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
      </div>
    </div>
  );
}
