"use client";

import React from "react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";

function SellerDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <p className="mt-4">
          Add new products, update inventory, and view your sales progress here.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default SellerDashboard;
