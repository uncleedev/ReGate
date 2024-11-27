"use client";

import Topbar from '@/components/common/Topbar';
import React from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Sidebar from '@/components/common/Sidebar';
import { AdminMenu, InstructorMenu } from '@/constants/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}


const InnerLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

  const {data: session} = useSession()

  const email = session?.user?.email

  return (
    <div className={`h-screen overflow-hidden ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
      <Topbar heading={"Admin Portal"}  onClick={() => signOut({redirect: true, callbackUrl: "/admin/signin"})} email={email} />
      <div className="h-[calc(100%-84px)] grid grid-cols-5">
        <Sidebar menu={AdminMenu}/>
        <div className={`col-span-4 overflow-auto ${isDarkMode ? `bg-[#121212] text-white` : 'bg-[#f1f1f1] text-black'} p-6 flex flex-col justify-between`}>
          {children}    
        </div>
      </div>
    </div>
  );
}