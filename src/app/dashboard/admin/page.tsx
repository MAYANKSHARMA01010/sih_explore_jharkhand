"use client";

import React from "react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-4">
          Manage users, monitor visits, track revenue, and oversee guides/sellers.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
