import SAFleets from "@/src/components/SuperAdmin/SAFleets";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";
 function fleets() {
  return (
      <SAmainLayout>
        <SAFleets />
      </SAmainLayout>
  );
}

export default withAuth(fleets);

