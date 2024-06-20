import SACamera from "@/src/components/SuperAdmin/SACamera";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";

 function camera() {
  return (
      <SAmainLayout>
        <SACamera />
      </SAmainLayout>
  );
}

export default withAuth(camera);
