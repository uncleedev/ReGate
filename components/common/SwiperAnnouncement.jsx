"use client"

import React from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { announcements } from '@/sample/data'
import Image from 'next/image';
export default function SwiperAnnouncement() {
  return (
    <Swiper
        navigation
        pagination={{ type: "bullets", clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        className='w-full h-[250px] md:h-[500px] shadow rounded-lg'
    >
        {announcements.map((data) => (
        <SwiperSlide key={data.id} className='w-full flex justify-center items-center'>
            <Image src={data.image} alt={data.title} objectFit='cover' layout='fill'/>
        </SwiperSlide>
        ))}
    </Swiper>
  )
}
