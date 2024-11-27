"use client"

import HeroSection from '@/components/common/HeroSection'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import { Colors } from '@/constants/colors'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AnnouncementLayout({children}) {

    const [announcements, setAnnouncements] = useState([])

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const res = await fetch("/api/announcements", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json()

                if (res.ok) {
                    setAnnouncements(data)
                }
            } catch (error) {
                console.log("Error fetching announcements: ", error)
            }
        }

        fetchAnnouncement()
    }, [])

  return (
    <div>
        <Navbar />
        <HeroSection heading={"News & Updates"} />
        <div className='w-full paddingvr grid grid-cols-5 gap-8 '>
            <div className='col-span-4 flex flex-col gap-9'>    
                {children}
            </div>
            <div className='col-span-1 flex flex-col border-l-2 border-gray-400 items-center'>
                <h2>Other Announcement</h2>
                <ul className='ml-8 mt-3 flex flex-col gap-2'>
                    {announcements.map((data) => (
                        <li className='text-[18px] font-medium underline list-disc hover:text-gray-400'>
                            <Link href={{
                                pathname: `/announcement/${data._id}`,
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
