import SAChiplAdmin from "@/src/components/SuperAdmin/SAChiplAdmin";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";

 function Admin() {
  return (
      <SAmainLayout>
        <SAChiplAdmin />
      </SAmainLayout>
  );
}

export default withAuth(Admin);