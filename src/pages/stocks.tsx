import SAStocks from "@/src/components/SuperAdmin/SAStocks";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function stocks() {
  return (
    <ProtectedRoute>
      <SAmainLayout>
        <SAStocks />
      </SAmainLayout>
    </ProtectedRoute>
  );
}
