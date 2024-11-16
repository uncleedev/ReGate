import HeroSection from '@/components/common/HeroSection'
import CardOfficial from '@/components/home/CardOfficial'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import CardSchedule from '@/components/portal/CardSchedule'
import React from 'react'

export default function AdministrationPage() {
  return (
    <div>
        <Navbar />
        <HeroSection heading={"Organization Chart"} />
        <section className='paddingvr flex flex-col gap-4'>
            <CardOfficial 
                color={"#ff0000"}
            />
            
        </section>
        <Footer />
    </div>
  )
}
