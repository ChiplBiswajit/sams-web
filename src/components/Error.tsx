import React from "react";
const errorCode = "404 - Page not found";
const errorMessage =
  "The page you are looking for might have been removed had its name changed or its temporary unavailable.";
export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center  gap-4 justify-center bg-gray-100">
      <p className="text-7xl font-bold text-centre"> Oops!</p>
      <h1 className="text-4xl font-medium text-black mb-2">{errorCode}</h1>
      <p className="text-gray-700 w-[30%] text-center">{errorMessage}</p>
      {/* <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Go back to home
      </a> */}
    </div>
  );
}
