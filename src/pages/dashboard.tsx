import React from "react";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import SADashboard from "@/src/components/SuperAdmin/SaDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SADashboard />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
