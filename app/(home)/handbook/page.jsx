import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import React from 'react';

export default function StudentHandBook() {
  return (
    <div>
      <Header />
      <HeroSection heading={"Student"} sub={"Handbooks"} />

      <section className='paddingvr flex justify-center items-center' style={{ overflow: 'hidden', height: '1400px' }}>
        <iframe className='bg-none' src="/files/student-handbook.pdf" frameborder="0" width={"60%"} height={"100%"}></iframe>
      </section>

      <Footer />
    </div>
  );
}