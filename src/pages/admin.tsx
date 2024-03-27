import SAChiplAdmin from "@/src/components/SuperAdmin/SAChiplAdmin";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SAChiplAdmin />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
