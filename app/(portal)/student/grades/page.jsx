"use client"

import { Colors } from '@/constants/colors'
import { useTheme } from '@/context/ThemeContext'
import React, { useState } from 'react'

// Updated course data with two semesters for each year
const firstYear = {
  semester1: [
    { id: 1, course_code: 'CS101', course_name: "Introduction to Computer Science", credits: 3, grade: 85 },
    { id: 2, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    { id: 3, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    { id: 4, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    { id: 5, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    { id: 6, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    { id: 7, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    { id: 8, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    // Add more courses as needed
  ],
  semester2: [
    { id: 1, course_code: 'ADBMS', course_name: "Advance Database Management System", credits: 3, grade: 99 },
    { id: 2, course_code: 'MATH101', course_name: "Calculus I", credits: 3, grade: 92 },
    // Add more courses as needed
  ],
};

const secondYear = {
  semester1: [
    { id: 1, course_code: 'CS101', course_name: "Introduction to Computer Science", credits: 3, grade: 85 },
    { id: 2, course_code: 'ENG101', course_name: "English Literature", credits: 3, grade: 90 },
    // Add more courses as needed
  ],
  semester2: [
    { id: 1, course_code: 'ADBMS', course_name: "Advance Database Management System", credits: 3, grade: 99 },
    { id: 2, course_code: 'MATH101', course_name: "Calculus I", credits: 3, grade: 92 },
    // Add more courses as needed
  ],
};

// Define other years similarly...

export default function StudentGradesPage() {
  const { isDarkMode } = useTheme();
  const [selectedYear, setSelectedYear] = useState('firstYear');
  const [selectedSemester, setSelectedSemester] = useState('semester1'); // State for selected semester

  const yearData = {
    firstYear,
    secondYear
    // Add other years here...
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester('semester1'); // Reset semester to semester1 when year changes
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h3>Grades</h3>

        <div className={`w-full flex flex-col shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} p-4 gap-4 rounded-md`}>
          
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <button 
                className={`p-2 font-semibold border-b-2 ${selectedYear === 'firstYear' ? (isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`) : 'border-transparent'}`} 
                onClick={() => handleYearChange('firstYear')}
              >
                1st year
              </button>
              
              <button 
                className={`p-2 font-semibold border-b-2 ${selectedYear === 'secondYear' ? (isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`) : 'border-transparent'}`} 
                onClick={() => handleYearChange('secondYear')}
              >
                2nd year
              </button>
            </div>

            <div className='flex gap-4'>
              <div>
                <input 
                  type="radio" 
                  id="semester1" 
                  name="semester" 
                  checked={selectedSemester === 'semester1'} 
                  onChange={() => handleSemesterChange('semester1')} 
                />
                <label htmlFor="semester1">1<sup>st</sup> Semester</label>
              </div>

              <div>
                <input 
                  type="radio" 
                  id="semester2" 
                  name="semester" 
                  checked={selectedSemester === 'semester2'} 
                  onChange={() => handleSemesterChange('semester2')} 
                />
                <label htmlFor="semester2">2<sup>nd</sup> Semester</label>
              </div>
            </div>
          </div>

          <table className='min-w-full border-collapse border border-gray-300'>
            <thead className={`bg-[${Colors.primary}] bg-opacity-25  border-[${Colors.primary}]`}>
              <tr>
                <th className='p-2'>Course Code</th>
                <th className='p-2'>Course Name</th>
                <th className='p-2'>Credits</th>
                <th className='p-2'>Grades</th>
              </tr>
            </thead>
            <tbody>
              {yearData[selectedYear][selectedSemester].map(course => (
                <tr className='text-center' key={course.id}>
                  <td className='border border-gray-300 p-2'>{course.course_code}</td>
                  <td className='border border-gray-300 p-2'>{course.course_name}</td>
                  <td className='border border-gray-300 p-2'>{course.credits}</td>
                  <td className='border border-gray-300 p-2'>{course.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </ div>

      <div className='flex flex-col gap-4'>
        <h3>Reminders</h3>
        
        <div className={`w-full flex flex-col shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} p-4 gap-4 rounded-md`}>
            <p className='opacity-70'>Grades displayed on this portal may not be up-to-date. All grades are subject to validation. Please consult your deans to understand why and how your grades are validated. <br />This information is reviewing reference only</p>
            <p className='opacity-70'>For updated and official use. please request a Summary of Grades form the Registrar's Office or in the requests section of the portal.</p>
        </div>
      </div>
    </>
  );
}