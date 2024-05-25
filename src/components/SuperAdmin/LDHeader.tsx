import socketServcies from "@/src/utils/Socket/socketService";
import { storeObjByKey } from "@/src/utils/Socket/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SALivedata from "./SALivedata";

export default function LDHeader() {
  const router = useRouter();
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState("");

 


  return (
    <div>
  
    </div>
  );
}
