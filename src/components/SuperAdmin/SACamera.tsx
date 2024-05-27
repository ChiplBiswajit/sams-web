

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
