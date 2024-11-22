"use client";

import Topbar from '@/components/common/Topbar';
import CustomButton from '@/components/CustomButton';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Sidebar from '@/components/common/Sidebar';
import { InstructorMenu } from '@/constants/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function InstructorLayout({ children }) {
  return (
    <ThemeProvider> {/* Wrap the children with ThemeProvider */}
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}


const InnerLayout = ({ children }) => {

  const { isDarkMode } = useTheme();
  const { data: session } = useSession()

  const [instructorNo, setInstructorNo] = useState("")
  const email = session?.user?.email


  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;

      const instructorExists = await fetch("/api/instructor-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const { instructor } = await instructorExists.json()

      if (instructor) {
        setInstructorNo(instructor.instructorNo)
      }
    }

    fetchData()
  }, [email])

  return (
    <div className={`h-screen overflow-hidden ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
      <Topbar heading={"Instructor Portal"} onClick={() => signOut({redirect: true, callbackUrl: "/instructor/signin"})} email={email} id={instructorNo}/>
      <div className="h-[calc(100%-84px)] grid grid-cols-5">
        <Sidebar menu={InstructorMenu}/>
        <div className={`col-span-4 overflow-auto ${isDarkMode ? `bg-[#121212] text-white` : 'bg-[#f1f1f1] text-black'} p-6 flex flex-col justify-between`}>
          {children}    
        </div>
      </div>
    </div>
  );
}