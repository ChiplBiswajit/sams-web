import React from "react";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import SADashboard from "@/src/components/SuperAdmin/SaDashboard";

export default function Dashboard() {
  return (
    <SAmainLayout>
      <SADashboard />
    </SAmainLayout>
  );
}
