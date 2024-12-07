"use client";

import React, { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import Link from 'next/link';

export default function SwiperAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("/api/announcements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load announcements.");
      } finally {
        setLoading(false); 
      }
    };

    fetchAnnouncement();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Swiper
      navigation
      pagination={{ type: "bullets", clickable: true }}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      loop={true}
      modules={[Autoplay, Navigation, Pagination]}
      className='w-full h-full shadow rounded-lg'
    >
      {announcements.map((data) => (
        <SwiperSlide key={data.id} className='w-full flex justify-center items-center relative'>
          <Link href={`/announcement/${data._id}`}>
            <Image 
              src={data.image} 
              alt={data.title} 
              layout='fill' 
              objectFit='cover' 
              className='rounded-lg' 
            />        
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}