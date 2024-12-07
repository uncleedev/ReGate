"use client"

import Image from 'next/image'
import React from 'react'

export default function HeroSection({heading, sub}) {
  return (
    <section className={`bg-[#044721] hidden md:flex w-full h-[320px] md:h-[520px]  justify-center items-center relative`}>
        <Image src={require("@/public/images/prrc-building.jpeg")} className='h-full w-full object-cover opacity-5 absolute' />
        <h1 className='text-center text-white'>
            {heading} <br />
            {sub && (
              <span className='text-[#FEFE00]'>{sub}</span>
            )}
        </h1>
    </section>
  )
} 