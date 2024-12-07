
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import HeroSection from '@/components/home/HeroSection'
import React from 'react'
import PresidentAcademicSection from './PresidentAcademicSection'

export default function OfficeOfTheVicePresident() {
  return (
    <div>
        <Header />
        <HeroSection heading={"Office of the"} sub={"Vice President for Academic Affairs"} />
        <PresidentAcademicSection />
        <Footer />
    </div>
  )
}
