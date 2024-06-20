import SAStocks from "@/src/components/SuperAdmin/SAStocks";
import SAmainLayout from "@/src/layouts/SuperAdmin/SAmainLayout";
import React from "react";
import withAuth from "../utils/ProtectedRoute/withAuth";

 function stocks() {
  return (
      <SAmainLayout>
        <SAStocks />
      </SAmainLayout>
  );
}
export default withAuth(stocks);
