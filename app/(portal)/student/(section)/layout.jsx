"use client";

import Topbar from '@/components/common/Topbar';

import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Sidebar from '@/components/common/Sidebar';
import { StudentMenu } from '@/constants/navigation';
import Modal from '@/components/common/Modal';
import { useRouter } from 'next/navigation';

export default function StudentLayout({ children }) {
  return (
    <ThemeProvider> 
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}


const InnerLayout = ({ children }) => {
  
  const { isDarkMode } = useTheme(); 
  const router = useRouter()

  return (
    <>
      <div className={`h-screen overflow-hidden ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
        <Topbar heading={"Student Portal"} onClick={() => router.replace("/student/signin")}/>
        <div className="h-[calc(100%-84px)] grid grid-cols-5">
          <Sidebar menu={StudentMenu}/>
          <div className={`col-span-4 overflow-auto ${isDarkMode ? `bg-[#121212] text-white` : 'bg-[#f1f1f1] text-black'} p-6 flex flex-col gap-6 overflow-hidden`}>
            {children}    
          </div>
        </div>
      </div>
    </>
  );
}