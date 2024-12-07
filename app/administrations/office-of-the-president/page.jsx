
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import HeroSection from '@/components/home/HeroSection'

import React from 'react'
import PresidentSection from './PresidentSection'

export default function OfficeOfThePresident() {
  return (
    <div>
        <Header />
        <HeroSection heading={"Office of the"} sub={"President"} />
        <PresidentSection />
        <Footer />
    </div>
  )
}
