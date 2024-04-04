//import React from "react";
// const cameras = [
//   {
//     id: 12,
//     img: "user1",
//   },
//   {
//     id: 13,
//     img: "user2",
//   },
//   {
//     id: 14,
//     img: "user2",
//   },
// ];
// export default function SACamera() {
//   return (
//     <div className="h-screen">
//       <span className="center">
//         <h2 className=" text-center font-semibold text-xl underline-offset-4 underline">Amtek livefeed</h2>
//       </span>
//       <div className="grid grid-cols-3 place-items-center">
//         {cameras.map((camera, index) => (
//           <div
//             key={index}
//             className="m-2 flex bg-[#D0D6E2] w-[90%] rounded-lg p-2"
//           >
//             <div className="w-full  gap-2 grid place-items-center">
//               <div className="bg-white  rounded-md w-full text-center text-sm">Ambulance num: {camera.id}</div>
//               <div className="bg-white rounded-md  h-[35vh] w-full ">
//                video
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// components/SACamera.js
import { Amteklogo } from "@/src/assets/SuperAdmin/header";
import { useEffect } from "react";
import io from "socket.io-client";

export default function SACamera() {
  useEffect(() => {
    const socket = io();

    function getQueryParam(param: any) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    socket.on("connect", () => {
      const ambulanceId = getQueryParam("ambulanceId");
      // console.log("Connected to the socket", ambulanceId);
      socket.emit("joinRoom", ambulanceId);
    });

    socket.on("send_message", (msg) => {
      // Handle incoming messages from server
      const vdo = document.getElementById(
        "messageInput"
      ) as HTMLImageElement | null;
      if (vdo) {
        vdo.src = `data:image/jpeg;base64,${msg}`;
      } else {
        // console.error(
        //   "Element with id 'messageInput' not found or is not an image element"
        // );
      }
    });

    socket.on("peopleInRoom", (numberOfClients) => {
      // console.log(`There are ${numberOfClients} people in the room.`);
    });

    socket.on("disconnect", () => {
      // console.log("Disconnected from the server room");
    });

    return () => {
      // Cleanup on unmount
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-blue-300  justify-center items-center h-screen w-full">
      <div className="fixed  w-full">
        <div className="container py-1 center flex  w-full">
          <span className="w-10 h-auto items-start">
            <img src={Amteklogo.src} alt="" className="w-full h-full" />
          </span>
          <h1 className="text-black text-lg text-center">Amtek live Feed</h1>
        </div>
        <div className="bg-red-500 h-[85vh] w-[90%]">
          <img
            style={{ backgroundColor: "aqua" }}
            id="messageInput"
            src=""
            alt="Received Image"
          />
        </div>
      </div>
    </div>
  );
}
