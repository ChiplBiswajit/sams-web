import React, { useEffect, useState } from "react";
import Spo2Graph from "./Spo2Graph";
import Socketconfig from "@/src/utils/Socket/Socketconfig";
import EcgGraph from "./EcgGraph";
import RespiratoryGraph from "./RespiratoryGraph";

export default function LarkAiData() {
  const [res, setRes] = useState([]);
  const [Temprature, setTemprature] = useState('--');
  const [Systolic, setSystolic] = useState('---');
  const [diastolic, setdiastolic] = useState('---');
  const [spo2, setspo2] = useState('--');
  const [pulserate, setpulserate] = useState('---');
  const [HeartRate, setHeartRate] = useState('---');




  useEffect(() => {
    Socketconfig.initializeSocket();
    Socketconfig.on("1234", (msg: any) => {
      const jsonData = JSON.parse(msg);
      // console.log("Received data from socket:", msg);
      setRes(jsonData);
      if (
        jsonData &&
        jsonData.patientData &&
        jsonData.patientData.temperature &&
        jsonData.patientData.temperature.temp1
      ) {
        setTemprature(jsonData.patientData.temperature.temp1);
      }
      if (
        jsonData &&
        jsonData.patientData &&
        jsonData.patientData.bloodPressure &&
        jsonData.patientData.bloodPressure.systolic
      ) {
        setSystolic(jsonData.patientData.bloodPressure.systolic);
      }
      if (
        jsonData &&
        jsonData.patientData &&
        jsonData.patientData.bloodPressure &&
        jsonData.patientData.bloodPressure.diastolic
      ) {
        setdiastolic(jsonData.patientData.bloodPressure.diastolic);
      }
      if (
        jsonData &&
        jsonData.patientData &&
        jsonData.patientData.oxygenSaturation &&
        jsonData.patientData.oxygenSaturation.wave
      ) {
        setspo2(jsonData.patientData.oxygenSaturation.wave);
      }
      if (
        jsonData &&
        jsonData.patientData &&
        jsonData.patientData.pulseRate &&
        jsonData.patientData.pulseRate.wave
      ) {
        setpulserate(jsonData.patientData.pulseRate.wave);
      }
      if (
        jsonData &&
        jsonData.patientData &&
        jsonData.patientData.heartRate &&
        jsonData.patientData.heartRate.wave
      ) {
        setHeartRate(jsonData.patientData.heartRate.wave);
      }
    });
  }, []);

  useEffect(() => {
    if (res === null) {
      console.log("Data not fetched from socket.");
    }
  }, [res]);

  // console.log("data:",res.patientData);

  return (
    <div className="flex flex-col center gap-10 w-full">
      <div className="flex gap-4">
        <span className="  py-1  p-1 flex gap-3">
          <p className="text-lg text-black font-bold">Temprature 1:</p>
          <span className="border text-black border-black rounded-md  px-3 py-1">
            {Temprature } &#8451;
          </span>
        </span>

        {/* <span className="  py-1  p-1 flex gap-3">
          <p className="text-lg text-black font-bold">Temprature 2:</p>
          <span className="border text-black border-black rounded-xl  px-3 py-1">
          {res.patientData?.temperature?.temp2}  
          </span>
        </span> */}
        <span className="  py-1  p-1 flex gap-3">
          <p className="text-lg text-black font-bold">Blood Pressure :</p>
          <span className="border text-black border-black rounded-md  px-3 py-1">
            {Systolic} / {diastolic }
          </span>
        </span>
        <span className="  py-1  p-1 flex gap-3">
          <p className="text-lg text-black font-bold">SpO2</p>
          <span className="border text-black border-black rounded-md  px-3 py-1">
            {spo2 }
          </span>
        </span>
        <span className="  py-1  p-1 flex gap-3">
          <p className="text-lg text-black font-bold">Pulse rate:</p>
          <span className="border text-black border-black rounded-md  px-3 py-1">
            {pulserate}
          </span>
        </span>
        <span className="  py-1  p-1 flex gap-3">
          <p className="text-lg text-black font-bold">Heart rate:</p>
          <span className="border text-black border-black rounded-md  px-3 py-1">
            {HeartRate}
          </span>
        </span>
      </div>
      <div className=" w-full flex flex-col gap-5 ">
        <Spo2Graph />
        <EcgGraph />
        <RespiratoryGraph />
      </div>
    </div>
  );
}
