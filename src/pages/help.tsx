import SAHelp from "@/src/components/SuperAdmin/SAHelp";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";

function help() {
  return (
      <SAmainLayout>
        <SAHelp />
      </SAmainLayout>
  );
}
export default withAuth(help);

