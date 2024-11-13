

import React from 'react';
import HeroSection from '@/components/common/HeroSection';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import { Colors } from '@/constants/colors';
import { Programs } from '@/constants/programs';
import ListPrograms from '@/components/home/ListPrograms';

export default function ProgramPage() {


  return (
    <div>
      <Navbar />
      <HeroSection heading={"Program"} sub={"Offers"} />
      <section className='w-full paddingvr'>
        <div className='flex flex-col gap-6'>
          {Programs.map((program) => (
            <ListPrograms  program={program}/>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}