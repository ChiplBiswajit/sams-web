import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  OverlayView,
  InfoWindow,
} from "@react-google-maps/api";
import socketServcies from "@/src/utils/Socket/socketService";

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

export default function SALocations() {
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
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", msg);
      setRes(msg);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return isLoaded ? (
    <div className="h-screen w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
        options={mapOptions}
      >
        {res.map((marker) => (
          <>
            <Marker
              key={marker?.ambulanceId}
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
