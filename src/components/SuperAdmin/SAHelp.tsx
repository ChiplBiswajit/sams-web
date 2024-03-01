import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

export default function SAHelp() {
  return (
    // <div className='h-screen'>SAHelp</div>
    <div className="h-screen">
      <LoadScript googleMapsApiKey="process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      </LoadScript>
    </div>
  );
}
