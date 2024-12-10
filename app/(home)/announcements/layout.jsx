"use client"

import CardNews from '@/components/home/CardNews'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import HeroSection from '@/components/home/HeroSection'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const isWithinLastThreeDays = (dateString) => {
    const announcmentsDate = new Date(dateString);
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    return announcmentsDate >= threeDaysAgo && announcmentsDate <= today;
}

export default function AnnouncmentsLayout({ children }) {
    const [announcments, setAnnouncements] = useState([]);

    const recentannouncments = announcments.filter(data => isWithinLastThreeDays(data.createdAt));

    useEffect(() => {
        const fetchannouncmentsEvents = async () => {
          try {
            const res = await fetch("/api/announcements", {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            })
    
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await res.json()
    
            setAnnouncements(data)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchannouncmentsEvents()
    }, []); // Added dependency array to avoid infinite loop

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <HeroSection heading={"announcments & Updates"} />
            <div className='w-full paddingvr grid grid-cols-1 md:grid-cols-5 gap-8 p-4'>
                <div className='col-span-1 md:col-span-4 flex flex-col gap-9'>    
                    {children}
                    <div>
                        <h2 className='text-center mb-4 text-xl md:text-2xl'>Other announcments</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 w-full">
                            {announcments.slice(0, 6).map((data) => (
                                <CardNews  
                                    key={data._id} 
                                    image={data.image}  
                                    title={data.headline} 
                                    description={data.caption}  
                                    date={data.date}
                                    id={data._id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col border-l-2 border-gray-400 items-center md:mt-0 mt-4'>
                    <h2 className='text-lg md:text-xl'>Latest announcments</h2>
                    <ul className='ml-8 mt-3 flex flex-col gap-2'>
                        {recentannouncments.map((data) => (
                            <li key={data._id} className='font-medium underline list-disc hover:text-gray-400'>
                                <Link href={{
                                    pathname: `/announcments/${data._id}`,
                                }}>{data.headline}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}