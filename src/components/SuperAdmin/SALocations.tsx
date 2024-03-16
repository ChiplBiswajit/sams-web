import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import socketServcies from "@/src/utils/Socket/socketService";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const center = {
  lat: 20.314081,
  lng: 85.818766,
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
const LocationData = () => {
  const [res, setRes] = useState<Message[]>([]);
  const [msg, setMsg] = useState<Message | null>(null);

  if (!googleMapsApiKey) {
    return <div>Error: Google Maps API key not defined</div>;
  }

  interface Message {
    atoms?: Array<{
      latitude: number;
      longitude: number;
    }>;
  }

  interface AmbulanceData {
    status: any; // Adjust the type according to your API response
    stocks: any;
    // Add other properties as needed
  }
  const [stocksData, setStocksData] = useState<AmbulanceData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const API_URL =
    "https://0r4mtgsn-3004.inc1.devtunnels.ms/admins/getAllLocationSams";

  useEffect(() => {
    fetchData();  
  }, []);

  const fetchData = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStocksData(data);
        console.log("ambulance List +++++++++", data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={6}
          options={mapOptions}
        >
          {msg?.atoms?.[0]?.latitude !== undefined &&
          msg?.atoms?.[0]?.longitude !== undefined ? (
            <Marker
              icon={{
                url: "/gps.png",
                scaledSize: { width: 60, height: 60 } as google.maps.Size,
              }}
              position={{
                lat: msg?.atoms?.[0]?.latitude || 20.29565501725301,
                lng: msg?.atoms?.[0]?.longitude || 85.81768540604737,
              }}
            />
          ) : (
            <div>Location not available</div>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default function SALocations() {
  return (
    <div className="h-screen ">
      <div className="w-full fixed h-full">
        <LocationData />
      </div>
    </div>
  );
}
