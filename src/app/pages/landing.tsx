import React from 'react'
import HeroSection from '../components/landingPage/HeroSection'
import Footer from "../components/common/footer" 
import Navbar from '../components/common/navbar'

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  )
}

export default Landing