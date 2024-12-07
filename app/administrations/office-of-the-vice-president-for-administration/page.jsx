
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import HeroSection from '@/components/home/HeroSection'
import React from 'react'
import PresidentAdministrationSection from './PresidentAdministrationSection'

export default function OfficeOfTheVicePresidentAdministrationAndFinance() {
  return (
    <div>
        <Header />
        <HeroSection heading={"Office of the"} sub={"Vice President for Academic Affairs"} />
        <PresidentAdministrationSection />
        <Footer />
    </div>
  )
}
