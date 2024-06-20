import SAAboutus from "@/src/components/SuperAdmin/SAAboutus";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";

function About_Us() {
  return (
    <SAmainLayout>
      <SAAboutus />
    </SAmainLayout>
  );
}

export default withAuth(About_Us);
