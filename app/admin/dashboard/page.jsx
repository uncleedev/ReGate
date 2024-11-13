"use client"

import AreaChartComp from '@/components/charts/AreaChartComp'
import BarChartComp from '@/components/charts/BarChartComp'
import PieChartComp from '@/components/charts/PieChartComp'
import { Colors } from '@/constants/colors'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'

export default function AdminDashboardPage() {
  
  const { isDarkMode } = useTheme()

  return (
    <div className='flex flex-col gap-4 h-full'>
        <h3>Dashboard</h3>
        
        <div className='flex w-full h-full gap-3'>
          <GridItem title={"title"}>
            <AreaChartComp />
          </GridItem>
          <GridItem title={"title"}>
            <BarChartComp />
          </GridItem>
        </div>

        <div className='flex w-full h-full gap3'>
          <div className='w-full'></div>
          <GridItem title={"title"}>
            <PieChartComp />
          </GridItem>
        </div>
    </div>
  )
}

function GridItem({title, children, style}) {

  const { isDarkMode } = useTheme()

  return (
    <div className={`flex flex-col items-center justify-center p-4  rounded-xl h-full w-full ${style} ${isDarkMode ? `bg-[${Colors.background[1]}]` : `bg-white`}`}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
