import SAFleets from "@/src/components/SuperAdmin/SAFleets";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function fleets() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SAFleets />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
