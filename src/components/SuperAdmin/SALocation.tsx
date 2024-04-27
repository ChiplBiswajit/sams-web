import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"; // Add this import
import socketServcies from "@/src/utils/Socket/socketService";

interface Message {
  atoms?: Array<{
    latitude: number;
    longitude: number;
  }>;
}

const containerStyle = {
  height: "100%",
  width: "100%",
};

const center = {
  lat: 20.2961,
  lng: 85.8245,
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
export default function SALocation() {
  const [res, setRes] = useState<Message[]>([]);
  // const [msg, setMsg] = useState<Message | null>(null);

  interface Message {
    longitude: number;
    latitude: number;
    ambulanceId: string | null | undefined;
  }

  const emitString = () => {
    socketServcies.emit("emit data", "locationRoom");
  };
  useEffect(() => {
    socketServcies.initializeSocket();
    emitString();
    socketServcies.on("All_Location", (msg: any) => {
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", msg);
      setRes(msg);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return isLoaded ? (
    <div className="h-screen w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        options={mapOptions}
      >
        {res.map((marker) => (
          <>
            <Marker
            key={marker.ambulanceId || `${marker.latitude}-${marker.longitude}`} // Use ambulanceId if available, otherwise generate a unique key
            icon={{
                url: "/gps.png",
                scaledSize: { width: 60, height: 60 } as google.maps.Size,
              }}
              position={{
                lat: marker?.latitude,
                lng: marker?.longitude,
              }}
            />
            <div className="font-semibold text-lg">{marker?.ambulanceId}</div>
            {/* </google.maps.marker.AdvancedMarkerElement> */}
          </>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
