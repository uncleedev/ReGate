"use client";

import Topbar from '@/components/common/Topbar';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Sidebar from '@/components/common/Sidebar';
import { StudentMenu } from '@/constants/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function StudentLayout({ children }) {
  const { data: session } = useSession();
  const [studentNo, setStudentNo] = useState("");
  const email = session?.user?.email;

  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;

      const studentExists = await fetch("/api/student-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const { student } = await studentExists.json();

      if (student) {
        setStudentNo(student.studentNo);
      }
    };

    fetchData();
  }, [email]);

  return (
    <ThemeProvider>
      <InnerLayout studentNo={studentNo}>{children}</InnerLayout>
    </ThemeProvider>
  );
}

const InnerLayout = ({ children, studentNo }) => {
  const { isDarkMode } = useTheme();
  const { data: session } = useSession();

  return (
    <div className={`h-screen overflow-hidden ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
      <Topbar heading={"Student Portal"} onClick={() => signOut({ redirect: true, callbackUrl: "/student/signin" })} email={session?.user?.email} id={studentNo} />
      <div className="h-[calc(100%-84px)] grid grid-cols-5">
        <Sidebar menu={StudentMenu} />
        <div className={`col-span-4 overflow-auto ${isDarkMode ? `bg-[#121212] text-white` : 'bg-[#f1f1f1] text-black'} p-6 flex flex-col gap-6 overflow-hidden`}>
          {children}
        </div>
      </div>
    </div>
  );
}