
import CardNews from '@/components/CardNews'
import AnnouncementSection from '@/components/home/AnnouncementSection'
import NewsUpdateSection from '@/components/home/NewsUpdateSection'


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Colors } from '@/constants/colors'
import InstitutesSection from '@/components/home/InstitutesSection'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import CustomButton from '@/components/CustomButton'
import HeroSection from '@/components/common/HeroSection'
import Topbar from '@/components/common/Topbar'
import Modal from '@/components/common/Modal'




export default function Home() {
  return (
    <div className='bg-[#F1F1F1] h-full'>
      <Navbar />
      <HeroSection heading={"Welcome to"} sub={"Colegio de Montalban"} />
      <NewsUpdateSection />
      <AnnouncementSection />
      <InstitutesSection />
      <Footer />
    </div>
  )
}