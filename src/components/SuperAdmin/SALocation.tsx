import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Loader from "../Loader";
import socketServcies from "@/src/utils/Socket/socketService";


interface Message {
  atoms?: Array<{
    latitude: number;
    longitude: number;
  }>;
  ambulanceId?: string;
  latitude?: number;
  longitude?: number;
}

const containerStyle = {
  height: "100%",
  width: "100%",
};

const defaultCenter = {
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
  const [selectedMarker, setSelectedMarker] = useState<Message | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAllLocation = (msg: any) => {
    setRes(msg);
    setLoading(false);
  };
  
  useEffect(() => {
    const usernamedata = sessionStorage.getItem("userid") || ""; // Provide a default value
    socketServcies.initializeSocket();
    socketServcies.emit("emit data", usernamedata);
    socketServcies.on("All_Location", (msg: any) => {
      console.log("usernamedataaaaaaaaaaaaaa", usernamedata);
      setRes(msg);
      setLoading(false); // Data has been received, set loading to false
      });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const handleMarkerClick = (marker: Message) => {
    setSelectedMarker(marker);
    if (
      map &&
      marker.latitude !== undefined &&
      marker.longitude !== undefined
    ) {
      const newPosition = {
        lat: marker.latitude,
        lng: marker.longitude,
      };
      map.panTo(newPosition);
      map.setZoom(8);
    }
  };

  return isLoaded ? (
    <div className="h-screen w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        options={mapOptions}
        onLoad={(map) => setMap(map)}
      >
        {res.map((marker) => (
          <Marker
            key={marker.ambulanceId || `${marker.latitude}-${marker.longitude}`}
            icon={{
              url: "/gps.png",
              scaledSize: { width: 60, height: 60 } as google.maps.Size,
            }}
            position={{
              lat: marker.latitude || 0,
              lng: marker.longitude || 0,
            }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude || 0,
              lng: selectedMarker.longitude || 0,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="font-semibold text-sm">
              {selectedMarker.ambulanceId}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <Loader />
  );
}
