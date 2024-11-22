"use client"

import { Colors } from '@/constants/colors'
import { useTheme } from '@/context/ThemeContext'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function StudentGradesPage() {
  const { isDarkMode } = useTheme();
  const [selectedYear, setSelectedYear] = useState(1); // Changed to number for easier comparison
  const [selectedSemester, setSelectedSemester] = useState(1); // Changed to number for easier comparison
  const [student, setStudent] = useState(null);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const foundStudent = data.find(item => item.email === email);
        setStudent(foundStudent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester(1);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const yearData = student.years.find(year => year.year_level === selectedYear);
  const semesterData = yearData ? yearData.semesters.find(sem => sem.semester_level === selectedSemester) : null;
  const courses = semesterData ? semesterData.courses : [];

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h3>Grades</h3>

        <div className={`w-full flex flex-col shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} p-4 gap-4 rounded-md`}>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <button 
                className={`p-2 font-semibold border-b-2 ${selectedYear === 1 ? (isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`) : 'border-transparent'}`} 
                onClick={() => handleYearChange(1)}
              >
                1st year
              </button>
              
              <button 
                className={`p-2 font-semibold border-b-2 ${selectedYear === 2 ? (isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`) : 'border-transparent'}`} 
                onClick={() => handleYearChange(2)}
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
                  checked={selectedSemester === 1} 
                  onChange={() => handleSemesterChange(1)} 
                />
                <label htmlFor="semester1">1<sup>st</sup> Semester</label>
              </div>

              <div>
                <input 
                  type="radio" 
                  id="semester2" 
                  name="semester" 
                  checked={selectedSemester === 2} 
                  onChange={() => handleSemesterChange(2)} 
                />
                <label htmlFor="semester2">2<sup>nd</sup> Semester</label>
              </div>
            </div>
          </div>

          <table className='flex flex-col w-full shadow-md rounded-md'>
            <thead className='w-full'>
              <tr className={`flex justify-between items-center bg-opacity-25 p-2 ${isDarkMode ? `text-[#FFE714] bg-[#FFE714]` : `text-[${Colors.primary}] bg-[${Colors.primary}]`} rounded-t-md`}>
                <th className='data items-center'>Course Code</th>
                <th className='data items-center'>Course Name</th>
                <th className='data items-center'>Credits</th>
                <th className='data items-center'>Grades</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {courses.map((course, index) => (
                <tr className='row' key={index}>
                  <td className='data p-1 items-center'>{course.course_code}</td>
                  <td className='data p-1 items-center'>{course.course_name}</td>
                  <td className='data p-1 items-center'>{course.credits}</td>
                  <td className='data p-1 items-center'>{course.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3>Reminders</h3>
        
        <div className={`w-full flex flex-col shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} p-4 gap-4 rounded-md`}>
            <p className='opacity-70'>Grades displayed on this portal may not be up-to-date. All grades are subject to validation. Please consult your deans to understand why and how your grades are validated. <br />This information is for reviewing reference only.</p>
            <p className='opacity-70'>For updated and official use, please request a Summary of Grades from the Registrar's Office or in the requests section of the portal.</p>
        </div>
      </div>
    </>
  );
}