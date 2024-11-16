"use client"

import CardSchedule from '@/components/portal/CardSchedule'
import { Colors } from '@/constants/colors'
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import React, {useState} from 'react'

export default function StudentSchedulePage() {

  const {isDarkMode} = useTheme()

  const [searchQuery, setSearchQuery] = useState('');


  return (
    <div className='flex flex-col gap-4 h-full w-full'>
      <div className='flex flex-col gap-3 h-full w-full'>
        <h3>Schedules</h3>

        <div className='grid grid-cols-5 pb-10 gap-4 h-full'>
          <div className='col-span-2 flex flex-col gap-3 h-full overflow-scroll hide-scrollbar'>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/>
            <CardSchedule color="#ff0000"/> 
            
          </div>
          <div className='col-span-3 flex items-end flex-col gap-4 w-full overflow-hidden'>
            <div className={`w-[300px] flex items-center ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} pl-3 gap-2 rounded-md shadow`}>
              <Image src={require("@/public/icons/search-dark.png")} alt="search" height={24} width={24} />
              <input 
                type="text"  
                placeholder='Search' 
                className='p-3 focus:outline-none rounded-md bg-transparent' 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>

            <table className={`${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} h-full w-full shadow-md rounded-md flex flex-col items-center overflow-scroll hide-scrollbar relative`}>
              <thead className='w-full flex items-center justify-center sticky top-0 left-0'>
                <tr className={`flex justify-between items-center p-2  bg-opacity-25   ${isDarkMode ? `text-[#FFE714] bg-[#FFE714]` : `text-[${Colors.primary}] bg-[${Colors.primary}]`} rounded-t-md w-full`}>
                  <th className='data items-center'>Room No.</th>
                  <th className='data items-center'>Course Code.</th>
                  <th className='data items-center'>Section</th>
                  <th className='data items-center'>Instructor</th>
                  <th className='data items-center'>Class Day</th>
                  <th className='data items-center'>Time.</th>
                </tr>
              </thead>
              <tbody className='w-full flex flex-col items-center justify-center'>
                <tr className='row w-full'>
                  <td className='data items-center'>1</td>
                  <td className='data items-center'>1</td>
                  <td className='data items-center'>1</td>
                  <td className='data items-center'>1</td>
                  <td className='data items-center'>1</td>
                  <td className='data items-center'>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
