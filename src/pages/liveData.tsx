import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import SALivedata from "../components/SuperAdmin/SALivedata";
import withAuth from "../utils/ProtectedRoute/withAuth";

 function liveData() {
  return (
      <SAmainLayout>
        <SALivedata />
      </SAmainLayout>
  );
}

export default withAuth(liveData);
