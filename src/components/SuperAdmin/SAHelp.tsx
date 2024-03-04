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
      <Map google={props.google} zoom={14}>
        <Marker onClick={onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={onInfoWindowClose} marker={selectedPlace}>
          <div>
            <h1>{selectedPlace && selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_API_KEY_GOES_HERE",
})(SAHelp);
