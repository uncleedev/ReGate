"use client"

import { useTheme } from '@/context/ThemeContext'
import React from 'react'

export default function DashboardSection() {

    const { isDarkMode } = useTheme()

  return (
    <div className={`h-full w-full flex flex-col justify-center  gap-4 p-6 ${isDarkMode ? `bg-[#121212] text-white` : `bg-[#f1f1f1] text-black`}`}>
        <div className='flex flex-col gap-4 h-full'>
        <h3>Dashboard</h3>
        
        <div className='flex w-full h-full gap-3'>
          <GridItem title={"Student"}>

          </GridItem>
          <GridItem title={"Bar Chart"}>

          </GridItem>
        </div>

        <div className='flex w-full h-full gap-3'>
          <GridItem title={"Student"}>

          </GridItem>
          <GridItem title={"Bar Chart"}>

          </GridItem>
        </div>
    </div>
    </div>
  )
}


function GridItem({title, children, style}) {
    const { isDarkMode } = useTheme()
  
    return (
      <div className={`flex flex-col items-center justify-center p-4 rounded-xl h-full w-full ${style} ${isDarkMode ? `bg-[#282828]` : `bg-white`}`}>
        <h3>{title}</h3>
        {children}
      </div>
    )
}