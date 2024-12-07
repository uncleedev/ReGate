import { ThemeProvider, useTheme } from '@/context/ThemeContext'
import { auth } from '@/auth'
import Sidebar from '@/components/portal/Sidebar'
import Topbar from '@/components/portal/Topbar'
import { StudentMenu } from '@/constants/navigation'
import React from 'react'
import { redirect } from 'next/navigation'

export default function Studentlayout({children}) {
  return (
    <ThemeProvider>
        <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  )
}

const  InnerLayout = async ({children}) => {

    const session = await auth()
    const user = session?.user

    if (!user) redirect("/student/signin")



  return (
    <div className={`h-screen overflow-hidden`}>
        <Topbar
            heading={"Student Portal"}
            email={user.email}
            id={user.studentNo}
            role={user.role}
        />
        <div className='h-[calc(100%-84px)] grid grid-cols-5'>
            <Sidebar menu={StudentMenu} />
            <div className={`col-span-4 flex flex-col gap-6 overflow-hidden relative`}>
                {children}
            </div>
        </div>
    </div>
  )
}
