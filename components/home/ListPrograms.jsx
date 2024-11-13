"use client"

import { Colors } from '@/constants/colors'
import React, { useState } from 'react'

export default function ListPrograms({program}) {

    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => {
        setIsVisible(prev => !prev)
    }

    const {program_code, program_name, year_level} = program


  return (
    <div>
        <h3 onClick={toggleVisibility} className={`cursor-pointer text-[${Colors.primary}] p-3 bg-[${Colors.primary}] bg-opacity-25 rounded-md shadow-md flex justify-between`}>
            {program_name} ({program_code}) <span className='cursor-pointer'>▼</span>
        </h3>
        {isVisible && (
            <div className='p-9'>
            <table className='program-table'>
                <thead className='w-full border-b-2 border-gray-300'>
                <tr className='flex justify-between'>
                    <th>Course Code</th>
                    <th>Description</th>
                    <th>Credits</th>
                </tr>
                </thead>
                <tbody>
                {year_level.map((level) => (
                    <>
                        <tr className='course bg-gray-200'>
                            <th>{level.year} - {level.semester}</th>
                        </tr>
                        {level.courses.map((course) => (
                            <tr className='course'>
                                <td>{course.course_code}</td>
                                <td>{course.course_name}</td>
                                <td>{course.credits}</td>
                            </tr>
                        ))}
                    </>
                ))}
                </tbody>
            </table>
            </div>
        )}
    </div>
  )
}
