"use client"

import { Colors } from '@/constants/colors';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'
import CustomButton from '@/components/CustomButton';

export default function Sidebar({menu}) {
    const router = useRouter();
    const pathname = usePathname()
    

  return (
    <div className="col-span-1 h-full shadow-md p-6 flex flex-col gap-3">
        
        {menu.map((item) => (
            <CustomButton key={item.name} icon={item.icon} title={item.name} onClick={() => router.push(item.link)} cmStyle={`${pathname === item.link ? `text-white bg-[${Colors.primary}]` : ""}`} />
        ))}
    </div>
  )
}
