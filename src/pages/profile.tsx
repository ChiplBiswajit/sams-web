import SAProfile from "@/src/components/SuperAdmin/SAProfile";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";

 function profile() {
  return (
      <SAmainLayout>
        <SAProfile />
      </SAmainLayout>
  );
}

export default withAuth(profile);
