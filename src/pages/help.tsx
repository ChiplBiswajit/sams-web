import SAHelp from "@/src/components/SuperAdmin/SAHelp";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function help() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SAHelp />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
