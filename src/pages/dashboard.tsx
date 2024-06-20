import React from "react";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import SADashboard from "@/src/components/SuperAdmin/SaDashboard";
import withAuth from "../utils/ProtectedRoute/withAuth";

function Dashboard() {
  return (
      <SAmainLayout>
        <SADashboard />
      </SAmainLayout>
  );
}

export default withAuth(Dashboard);
