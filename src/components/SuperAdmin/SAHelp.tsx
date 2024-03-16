import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const SAHelp = (props: any) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onMarkerClick = (props: any, marker: any) => {
    setSelectedPlace(props);
  };

  const onInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="h-screen w-full">
      <p>SAHelp</p>

    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_API_KEY_GOES_HERE",
})(SAHelp);
