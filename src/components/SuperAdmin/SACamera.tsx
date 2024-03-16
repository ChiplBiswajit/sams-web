import React from "react";
const cameras = [
  {
    id: 12,
    img: "user1",
  },
  {
    id: 13,
    img: "user2",
  },
  {
    id: 14,
    img: "user2",
  },
];
export default function SACamera() {
  return (
    <div className="h-screen">
      <span className="center">
        <h2 className=" text-center font-semibold text-xl underline-offset-4 underline">Amtek livefeed</h2>
      </span>
      <div className="grid grid-cols-3 place-items-center">
        {cameras.map((camera, index) => (
          <div
            key={index}
            className="m-2 flex bg-[#D0D6E2] w-[90%] rounded-lg p-2"
          >
            <div className="w-full  gap-2 grid place-items-center">
              <div className="bg-white  rounded-md w-full text-center text-sm">Ambulance num: {camera.id}</div>
              <div className="bg-white rounded-md  h-[35vh] w-full ">
               video
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
