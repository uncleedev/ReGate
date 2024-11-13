"use client"

import SwiperAnnouncement from '@/components/common/SwiperAnnouncement';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { announcements } from '@/sample/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function StudentDashboardPage() {
  const { isDarkMode } = useTheme(); 

  return (
    <>
      <div className='grid grid-cols-5 gap-4 h-[40%]'>
        <div className={`col-span-3 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center justify-start p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]` } inline-block mb-8`}>Profile</h2>
          <div className='flex items-center justify-around gap-8 w-full'>
            <Image 
              src={require("@/public/images/user-avatar.jpg")}
              width={150}
              height={150}
            />

            <div>
              <h3>Student No. : <span className='ml-7'>22-01383</span></h3>
              <h3>Name :<span className='ml-7'>Jhon Brian Arce</span></h3>
              <h3>Gender :<span className='ml-7'>Male</span></h3>
              <h3>Program : <span className='ml-7'>BSIT</span></h3>
            </div>
          </div>
        </div>
        <div className={`col-span-2 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`} inline-block mb-8`}>
            Announcements
          </h2>
          
          <div className='overflow-y-auto hide-scrollbar flex flex-col gap-2' style={{ maxHeight: '245px' }}>
            {announcements.map((data) => (
              <Link key={data.id} className='block decoration-black underline' href={`/announcements/${data.id}`}>
                {data.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-5 gap-4 h-[58%]'>
        <div className={`col-span-3 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center justify-between p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]` } inline-block`}>Enrolled Courses</h2>
        </div>
        <div className={`col-span-2 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center justify-between p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]` } inline-block`}>Schedules</h2>
        </div>
      </div>
    </>
  );
}