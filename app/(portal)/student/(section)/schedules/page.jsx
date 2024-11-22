"use client"

import CardSchedule from '@/components/portal/CardSchedule'
import { Colors } from '@/constants/colors'
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

export default function StudentSchedulePage() {

  const {isDarkMode} = useTheme()

  const [searchQuery, setSearchQuery] = useState('');
  const [schedules, setSchedules] = useState([])
  const [mySchedules, setMySchedules] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3002/schedules", {
        method: "GET",
        headers: {
          "Content-Type" : "application/json"
        }
      })

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json()
      setSchedules(data)

    }

    fetchData()
  }, [])

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
                {schedules.map((schedule) => (
                  <tr className='row w-full'>
                    <td className='data items-center'>{schedule.room_no}</td>
                    <td className='data items-center'>{schedule.course_code}</td>
                    <td className='data items-center'>{schedule.section}</td>
                    <td className='data items-center'>{schedule.instructor_name}</td>
                    <td className='data items-center'>{schedule.class_day.join(',')}</td>
                    <td className='data items-center'>{schedule.time.start_time} - {schedule.time.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
