

import React from 'react';
import Footer from '@/components/home/Footer';
import { Programs } from '@/constants/programs';
import ListPrograms from '@/components/home/ListPrograms';
import HeroSection from '@/components/home/HeroSection';
import Header from '@/components/home/Header';

export default function ProgramsPage() {


  return (
    <div>
      <Header />
      <HeroSection heading={"Programs"} sub={"Offer"} />
      <section className='w-full paddingvr'>
        <div className='flex flex-col gap-6'>
          {Programs.map((program) => (
            <ListPrograms key={program.program_code}  program={program}/>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}