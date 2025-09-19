"use client";

import React from "react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";
import HeroSection from "../../components/landingPage/HeroSection";
import ProblemSection from "../../components/landingPage/ProblemSection";
import JourneySection from "../../components/landingPage/JourneySection";
import CTASection from "../../components/landingPage/CTAsection";

function UserDashboard() {
  return (
    <>
      <Navbar />
      <HeroSection title="Welcome back 👋" />
      <ProblemSection />
      <JourneySection />
      <CTASection buttonText="Explore More" />
      <Footer />
    </>
  );
}

export default UserDashboard;
