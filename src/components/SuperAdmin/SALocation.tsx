import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
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

  const emitString = () => {
    socketServcies.emit("emit data", "locationRoom");
  };

  useEffect(() => {
    socketServcies.initializeSocket();
    emitString();
    socketServcies.on("All_Location", (msg: any) => {
      setRes(msg);
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const handleMarkerClick = (marker: Message) => {
    setSelectedMarker(marker);
    if (map && marker) {
      const newPosition = {
        lat: (marker as any).latitude,
        lng:  (marker as any).longitude,
      };
      map.panTo(newPosition);
      map.setZoom(8);
    }
  };

  return isLoaded ? (
    <div className="h-screen w-full">
      <GoogleMap
        key={""}
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        options={mapOptions}
        onLoad={(map) => setMap(map)}
      >
        {res.map((marker: any) => (
          <Marker
            key={
              (marker as any).ambulanceId ||
              `${marker.latitude}-${marker.longitude}`
            }
            icon={{
              url: "/gps.png",
              scaledSize: { width: 60, height: 60 } as google.maps.Size,
            }}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow 
            position={{
              lat: (selectedMarker as any).latitude,
              lng: (selectedMarker as any).longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className=" font-semibold text-sm">
              {(selectedMarker as any).ambulanceId}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
