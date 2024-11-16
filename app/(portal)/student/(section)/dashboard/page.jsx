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
          <h2 className={`border-b-2 ${isDarkMode ? `border-[#FFE714]` : `border-[${Colors.primary}]` } inline-block mb-8`}>Announcements</h2>
        </div>
        <div className={`col-span-2 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`} inline-block mb-8`}>
            Request Status
          </h2>
          
          
        </div>
      </div>

      <div className='grid grid-cols-5 gap-4 h-[58%]'>
        <div className={`col-span-3 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center justify-between p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]` } inline-block`}>Enrolled Courses</h2>
        </div>
        <div className={`col-span-2 ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`} shadow-md rounded-lg flex flex-col items-center justify-between p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]` } inline-block`}>Today Schedule</h2>
        </div>
      </div>
    </>
  );
}