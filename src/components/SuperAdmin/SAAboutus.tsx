import { email, linkedin, phonecall } from "@/src/assets/SuperAdmin/About-us";
import { map } from "@/src/assets/SuperAdmin/fleets/offcanvas";
import { Amteklogo } from "@/src/assets/SuperAdmin/header";
import React from "react";
import { FaAddressCard, FaLinkedin } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function SAAboutus() {
  return (
    // <section className="h-screen w-full">
    //   <div className="flex flex-col center  md:fixed">
    //     <div className="flex flex-col center">
    //       <h1 className=" text-3xl font-bold pt-2 p-1 text-[#01339f]">AMTeK</h1>
    //       <p className="text-lg font-bold text-transparent bg-gradient-to-r from-[#01339f] via-black to-[#01339f]  bg-clip-text">
    //         Ambulance Technology Kit - Revolutionizing Emergency Medical
    //         Services
    //       </p>
    //     </div>
    //     <div className=" w-[90%] gap-2 flex center">
    //       <p className="text-base  text-center font-medium p-2 text-gray-600">
    //         {" "}
    //         Elevate the standard of ambulance care with our cutting-edge AMTeK,
    //         a comprehensive Ambulance Technology Kit meticulously designed to
    //         monitor and enhance the quality of emergency medical services.
    //         Empowering healthcare providers, emergency responders, and patients
    //         alike, AMTeK combines advanced features to ensure a seamless and
    //         efficient ambulance experience.
    //       </p>
    //       <span className="h-24 w-[2px] rounded-md bg-black"></span>
    //       <img
    //         src={Amteklogo.src}
    //         alt=""
    //         className="w-auto h-28 cursor-pointer block float-left"
    //       />
    //     </div>
    //     <div className="mt-5 rounded-2xl w-[80vh] h-60 bg-[#dcdfff]">
    //       <p className=" text-2xl font-bold text-center underline">
    //         Contact Us
    //       </p>
    //       <span className="flex flex-col justify-center pl-4">
    //         <span className="flex gap-2  items-center m-2  w-full">
    //           <img src={phonecall.src} alt="" className=" h-6 w-6  " />
    //           <p className="text-lg font-normal">:</p>
    //           <p className="text-base font-normal">1800-121-9102</p>
    //         </span>
    //         <span className="flex gap-2 items-center m-2  w-full">
    //           <img src={email.src} alt="" className=" h-6 w-6  " />{" "}
    //           <p className="text-lg font-normal">:</p>
    //           <p className="text-base font-normal"> info@moambulance.in</p>
    //         </span>
    //         <span className="flex gap-2 items-center m-2  w-full">
    //           <img src={linkedin.src} alt="" className=" h-6 w-6  " />{" "}
    //           <p className="text-lg font-normal">:</p>
    //           <p className="text-base font-normal">Linkedin url</p>
    //         </span>
    //         <span className="flex gap-2 items-center  m-2  w-full">
    //           <img src={map.src} alt="" className=" h-6 w-6  " />{" "}
    //           <p className="text-lg font-normal">:</p>
    //           <span className=" flex-col flex">
    //             <p className="text-base font-normal">
    //               Plot No-509, Hats Off Apartment, Near SBI, Saheed Nagar,
    //             </p>
    //             <p className="text-base font-normal">
    //               Bhubaneswar, Odisha, 751007.{" "}
    //             </p>
    //           </span>
    //         </span>
    //       </span>
    //     </div>
    //   </div>
    // </section>

    <div className="h-screen w-full ">
    <div className="flex flex-col center ">
      <div className="flex flex-col center">
        <h1 className="text-2xl md:text-3xl font-bold pt-2 p-1 text-[#01339f]">
          AMTeK
        </h1>
        <p className="text-base md:text-lg text-center font-bold text-transparent bg-gradient-to-r from-[#01339f] via-black to-[#01339f] bg-clip-text">
          Ambulance Technology Kit - Revolutionizing Emergency Medical
          Services
        </p>
      </div>
      <div className="w-[90%] gap-2 flex flex-col center">
        <img
          src={Amteklogo.src}
          alt=""
          className="w-auto h-28 cursor-pointer block mx-auto"
        />
        <p className="text-base md:text-lg text-center font-medium  text-gray-600">
          Elevate the standard of ambulance care with our cutting-edge AMTeK,
          a comprehensive Ambulance Technology Kit meticulously designed to
          monitor and enhance the quality of emergency medical services.
          Empowering healthcare providers, emergency responders, and patients
          alike, AMTeK combines advanced features to ensure a seamless and
          efficient ambulance experience.
        </p>
      </div>
      <div className="mt-5 rounded-2xl  md:w-[80vh] h-60 bg-[#dcdfff]">
        <p className="text-lg md:text-2xl font-bold text-center underline">
          Contact Us
        </p>
        <span className="flex flex-col justify-center pl-4">
            <span className="flex gap-2  items-center m-2  w-full">
              <img src={phonecall.src} alt="" className=" h-6 w-6  " />
              <p className="text-lg font-normal">:</p>
              <p className="text-base font-normal">1800-121-9102</p>
            </span>
            <span className="flex gap-2 items-center m-2  w-full">
              <img src={email.src} alt="" className=" h-6 w-6  " />{" "}
              <p className="text-lg font-normal">:</p>
              <p className="text-base font-normal"> info@moambulance.in</p>
            </span>
            <span className="flex gap-2 items-center m-2  w-full">
              <img src={linkedin.src} alt="" className=" h-6 w-6  " />{" "}
              <p className="text-lg font-normal">:</p>
              <p className="text-base font-normal">Linkedin url</p>
            </span>
            <span className="flex gap-2 items-center  m-2  w-full">
              <img src={map.src} alt="" className=" h-6 w-6  " />{" "}
              <p className="text-lg font-normal">:</p>
              <span className=" flex-col flex">
                <p className="text-base font-normal">
                  Plot No-509, Hats Off Apartment, Near SBI, Saheed Nagar,
                </p>
                <p className="text-base font-normal">
                  Bhubaneswar, Odisha, 751007.{" "}
                </p>
              </span>
            </span>
          </span>
      </div>
    </div>
  </div>
);
}


