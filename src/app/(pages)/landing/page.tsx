"use client";

import React from 'react'
import HeroSection from '../../components/landingPage/HeroSection'
import Footer from "../../components/common/footer" 
import Navbar from '../../components/common/navbar'
import ProblemSection from '../../components/landingPage/ProblemSection'
import Features from '@/app/components/landingPage/Features';

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <Features/>
      <Footer />
    </>
  )
}

export default Landing