import SAProfile from "@/src/components/SuperAdmin/SAProfile";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function profile() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SAProfile />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
