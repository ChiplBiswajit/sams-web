import SALocations from "@/src/components/SuperAdmin/SALocations";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function location() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SALocations />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
