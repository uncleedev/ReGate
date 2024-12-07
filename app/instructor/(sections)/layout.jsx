import { ThemeProvider, useTheme } from '@/context/ThemeContext'
import { auth } from '@/auth'
import Sidebar from '@/components/portal/Sidebar'
import Topbar from '@/components/portal/Topbar'
import { InstructorMenu, StudentMenu } from '@/constants/navigation'
import React from 'react'
import { redirect } from 'next/navigation'

export default function Instructorlayout({children}) {
  return (
    <ThemeProvider>
        <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  )
}

const  InnerLayout = async ({children}) => {

    const session = await auth()
    const user = session?.user

    if (!user) redirect("/instructor/signin")



  return (
    <div className={`h-screen overflow-hidden`}>
        <Topbar
            heading={"Instructor Portal"}
            email={user.email}
            id={user.instructorNo}
            role={user.role}
        />
        <div className='h-[calc(100%-84px)] grid grid-cols-5'>
            <Sidebar menu={InstructorMenu} />
            <div className={`col-span-4 flex flex-col gap-6 overflow-hidden relative`}>
                {children}
            </div>
        </div>
    </div>
  )
}
