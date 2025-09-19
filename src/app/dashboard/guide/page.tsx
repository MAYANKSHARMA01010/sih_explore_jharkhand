"use client";

import React from "react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";

function GuideDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold">Guide Dashboard</h1>
        <p className="mt-4">
          Here you can manage your tours, track bookings, and connect with travelers.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default GuideDashboard;
