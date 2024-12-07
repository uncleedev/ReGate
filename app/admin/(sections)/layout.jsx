import { ThemeProvider } from '@/context/ThemeContext'
import { auth } from '@/auth'
import Sidebar from '@/components/portal/Sidebar'
import Topbar from '@/components/portal/Topbar'
import { AdminMenu } from '@/constants/navigation'
import React from 'react'
import { redirect } from 'next/navigation'

export default function Adminlayout({children}) {
  return (
    <ThemeProvider>
        <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  )
}

const  InnerLayout = async ({children}) => {

    const session = await auth()
    const user = session?.user

    if (!user) redirect("/admin/signin")


  return (
    <div className={`h-screen overflow-hidden`}>
        <Topbar
            heading={"Admin Portal"}
            email={user.email}
            role={user.role}
        />
        <div className='h-[calc(100%-84px)] grid grid-cols-5'>
            <Sidebar menu={AdminMenu} />
            <div className={`col-span-4 flex flex-col gap-6 overflow-hidden relative`}>
                {children}
            </div>
        </div>
    </div>
  )
}
