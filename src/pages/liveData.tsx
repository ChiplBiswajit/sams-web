import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import SALivedata from "../components/SuperAdmin/SALivedata";
import ProtectedRoute from "./ProtectedRoute";

export default function liveData() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SALivedata />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
