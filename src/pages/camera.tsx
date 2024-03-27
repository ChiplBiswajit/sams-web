import SACamera from "@/src/components/SuperAdmin/SACamera";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function camera() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SACamera />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
