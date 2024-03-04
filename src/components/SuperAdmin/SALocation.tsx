import React, { useCallback, useEffect, useState } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  OverlayView,
  InfoWindow
} from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "100%",
};
interface CircleData {
  id: number;
  radiusInMeters: number;
  centerCoordinate: {
    latitude: number;
    longitude: number;
  };
  clr: string;
  fillclr: string;
  place: string;
}

const circledata= [
  {
    id: 1,
    radiusInMeters: 200,
    centerCoordinate: { latitude: 20.295104, longitude: 85.824946 },
    clr: "blue",
    fillclr: "rgba(225,0, 0, 0.2)",
    place:"jayadev vihar"
  }, //jayadev vihar
  {
    id: 2,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.314719639309015,
      longitude: 85.82027403816568,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"kalinga Hospital square"
  }, //kalinga Hospital square
  {
    id: 3,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.296127733232417,
      longitude: 85.84213054148022,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"vani Vihar Square"
  }, //vani Vihar Square
  {
    id: 4,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.2968213699563,
      longitude: 85.83327461883489,
    },
    clr: "blue",
    fillclr: "rgba(225,0, 0, 0.2)",
    place:"aachrya Vihar"
  }, //aachrya Vihar
  //achrya vihar line
  {
    id: 5,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.286476838023763,
      longitude: 85.83471557540393,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Nicco Park Square"
  }, //Nicco Park Square
  {
    id: 10,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.266427133400523,
      longitude: 85.8298471051211,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Ag Square"
  }, //Ag Square
  {
    id: 12,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.257469601581185,
      longitude: 85.8227607739623,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Airport Square"
  }, //Airport Square
  //jayadev vihar line
  {
    id: 13,
    radiusInMeters: 300,
    centerCoordinate: {
      latitude: 20.307914384393104,
      longitude: 85.82021895914778,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Xavier Square"
  }, //Xavier Square
  {
    id: 15,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.332532623117004,
      longitude: 85.82150812827051,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Damana Square"
  }, //Damana Square
  {
    id: 16,
    radiusInMeters: 500,
    centerCoordinate: {
      latitude: 20.342428908496505,
      longitude: 85.82281231698607,
    },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Patia Square"
  }, //Patia Square
  {
    id: 17,
    radiusInMeters: 500,
    centerCoordinate: { latitude: 20.353243, longitude: 85.826563 },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Kiit Suqare"
  }, //Kiit Suqare
  {
    id: 18,
    radiusInMeters: 500,
    centerCoordinate: { latitude: 20.255314, longitude: 85.831799 },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"sisubhaban"
  }, //sisubhaban
  {
    id: 19,
    radiusInMeters: 500,
    centerCoordinate: { latitude: 20.268781, longitude: 85.840999 },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"master cant."
  }, //master cant..
  {
    id: 20,
    radiusInMeters: 500,
    centerCoordinate: { latitude: 20.284852, longitude: 85.807834 },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Crp Square"
  }, //Crp Square
  {
    id: 21,
    radiusInMeters: 500,
    centerCoordinate: { latitude: 20.28885433, longitude: 85.852025 },
    clr: "blue",
    fillclr: "rgba(0, 128, 255, 0.2)",
    place:"Crp Square"
  }, //Crp Square
];
// import socketServcies from "./socketService"
export default function SALocation() {
  const [circleStates, setCircleStates] = useState(circledata.map(() => ({ color: "blue", blinking: false })));
  const [selectedMarker, setSelectedMarker] = useState<CircleData | null>(null);
  const [res, setRes]= useState<any>()
  const [blinking, setBlinking] = useState<any>(false)
  const ambData = [
    { latitude: res?.lat == null? 0  : res?.lat, longitude: res?.long == null? 0:res?.long ,rotation: 0, prevPosition: { lat: 0, lng: 0 } },
    // { latitude: 20.297113, longitude: 85.830464 },
    // { latitude: 20.32277, longitude: 85.80017 },
    // { latitude: 20.321612494715698, longitude: 85.81308195627285 },
  ];
  const [vehicles, setVehicles] = useState<any[]>(ambData.map((vehicle, index) => ({ id: index, ...vehicle, rotation: 0 })));
console.log("data",vehicles)

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
 
});
  // useEffect(() => {
  //   try{
  //   socketServcies.initializeSocket();
  //   socketServcies.on("received_message", (msg:any) => {
  //       setRes(msg);
  //     console.log("received_message", msg);
  //     const newAmbData = ambData.map((vehicle) => {
  //       const prevPosition = { ...vehicle.prevPosition };
  //       const currentPosition = { lat: msg.lat || 0, lng: msg.long || 0 };

  //       const rotation = calculateRotation(prevPosition, currentPosition);
  //       return {
  //         ...vehicle,
  //         latitude: currentPosition.lat,
  //         longitude: currentPosition.lng,
  //         rotation: rotation,
  //         prevPosition: currentPosition,
  //       };
  //     });

  //     setVehicles(newAmbData);
  //   });
  //   const newCircleStates = circleStates.map((circleState, index) => {
  //     const isInside = checkIfInsideCircle(vehicles[0], circledata[index]);
  //     if (isInside) {
  //       // If the vehicle is inside, change color to red and start blinking
  //       return { color: "red", blinking: true };
  //     } else {
  //       // If the vehicle is outside, revert to the original state
  //       return { color: "blue", blinking: false };
  //     }
  //   });

  //   setCircleStates(newCircleStates);
  // }
  //   catch{
  //     console.log(Error);
  //   }
  // }, []);

  const checkIfInsideCircle = (vehicle:any, circle:any) => {
    const vehiclePosition = { lat: vehicle.latitude, lng: vehicle.longitude };
    const circleCenter = {
      lat: circle.centerCoordinate.latitude,
      lng: circle.centerCoordinate.longitude,
    };
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      new window.google.maps.LatLng(vehiclePosition),
      new window.google.maps.LatLng(circleCenter)
    );
  
    return distance <= circle.radiusInMeters;
  };


  const calculateRotation = (prevPosition: any, currentPosition: any) => {
    const angleRad = Math.atan2(
      currentPosition.lng - prevPosition.lng,
      currentPosition.lat - prevPosition.lat
    );
  
    const angleDeg = (angleRad * 180) / Math.PI;
  
    // Adjust the rotation based on the desired orientation of your icon
    const rotation = (angleDeg + 360) % 360;
  
    return rotation;
  };


  const [center, setCenter] = useState<any>({
    lat: 20.296059,
    lng: 85.824539,
  });


  const [map, setMap] = useState<any>(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);


 
   
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

  const onSelectMarker = (item: CircleData) => {
    setSelectedMarker(item === selectedMarker ? null : item);
  };

  // const toggleBlinking = () => {
  //   setBlinking((prevBlinking:any) => !prevBlinking);
  // };

 
  return isLoaded ? (
    <section className="w-full main-container h-screen">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
       {circledata.map((item: any, index: number) => (
        <div key={item.id} className={circleStates[index].blinking ? "blinking" : ""}>
  <Circle
    
    center={{
      lat: item.centerCoordinate.latitude,
      lng: item.centerCoordinate.longitude,
    }}
    options={{
      strokeColor: circleStates[index].color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: circleStates[index].color,
      fillOpacity: circleStates[index].color === "red" ? 0.8 : 0,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: item.radiusInMeters,
    }}
    
  />
  </div>
))}

        {circledata.map((item: any) => (
          <Marker
            position={{
              lat: item.centerCoordinate.latitude,
              lng: item.centerCoordinate.longitude,
            }}
            icon={{
              url: "/google-maps.png",
              scaledSize: new window.google.maps.Size(35, 40),
            }}
            onClick={() => onSelectMarker(item)}
            // label={}
          >
            
            {selectedMarker && selectedMarker.id === item.id && (
              <InfoWindow
                position={{
                  lat: item.centerCoordinate.latitude,
                  lng: item.centerCoordinate.longitude,
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <p>{selectedMarker.place}</p>
              </InfoWindow>
            )}
          
            
          </Marker>
        ))}
            

            {vehicles.map((vehicle: any) => (
  <Marker
    key={vehicle.id}
    position={{
      lat: vehicle.latitude,
      lng: vehicle.longitude,
    }}
    icon={{
      url: "/medical.png",
      scaledSize: new window.google.maps.Size(50, 50),
       rotation: 45,
    }}
    
  />
))}
   
      </GoogleMap>
    </section>
  ) : (
    <></>
  );
}
