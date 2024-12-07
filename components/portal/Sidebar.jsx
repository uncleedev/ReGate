"use client"

import { Colors } from '@/constants/colors';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'
import CustomButton from './CustomButton';
import { useTheme } from '@/context/ThemeContext';

export default function Sidebar({menu}) {

    const {isDarkMode} = useTheme()

    const router = useRouter();
    const pathname = usePathname()
    

  return (
    <div className={`col-span-1 z-10 h-full shadow-md p-6 flex flex-col justify-between ${isDarkMode ? `bg-[#282828] text-white` : `bg-white`}`}>
        
        <div className='flex flex-col gap-3'>
          {menu.map((item) => (
              <CustomButton key={item.name} icon={item.icon} title={item.name} onClick={() => router.push(item.link)} cmStyle={`${pathname === item.link ? `text-white bg-[${Colors.primary}]` : ""}`} />
          ))}
        </div>

        <h6 className='text-[12px] text-center'>2024 © Copyright <br />
        Managed and maintained by CDMMIS</h6>
    </div>
  )
}
