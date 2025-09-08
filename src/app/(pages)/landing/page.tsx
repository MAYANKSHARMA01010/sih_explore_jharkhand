"use client";

import React from 'react'
import HeroSection from '../../components/landingPage/HeroSection'
import Footer from "../../components/common/footer" 
import Navbar from '../../components/common/navbar'
import ProblemSection from '../../components/landingPage/ProblemSection'

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <Footer />
    </>
  )
}

export default Landing