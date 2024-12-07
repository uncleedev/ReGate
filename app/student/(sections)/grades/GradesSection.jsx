"use client";

import { useTheme } from '@/context/ThemeContext';
import React, { useState, useEffect } from 'react';

export default function GradesSection({ user }) {
  const { isDarkMode } = useTheme();
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentRes = await fetch("/api/students", { method: "GET" });

        if (!studentRes.ok) {
          throw new Error('Network response was not ok');
        }

        const studentData = await studentRes.json();
        const foundStudent = studentData.data.students.find(item => item.studentNo === user.studentNo);
        setStudent(foundStudent);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load student data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester(1);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  if (loading) {
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!student || !student.years) {
    return <div>No student data available.</div>;
  }

  const yearData = student.years.find(year => year.year_level === selectedYear);
  const semesterData = yearData ? yearData.semesters.find(semester => semester.semester_level === selectedSemester) : null;
  const courses = semesterData ? semesterData.courses : [];

  return (
    <div className={`p-6 h-full w-full flex flex-col gap-4 ${isDarkMode ? `bg-[#121212] text-white` : `bg-[#f1f1f1] text-black`}`}>
      <div className='flex flex-col gap-4'>
        <h3>Grades</h3>
        <div className={`w-full flex flex-col shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} p-4 gap-4 rounded-md`}>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              {[1, 2, 3, 4].map(year => (
                <button 
                  key={year}
                  className={`p-2 font-semibold border-b-2 ${selectedYear === year ? (isDarkMode ? `border-[#FFE714]` : `border-[#044721]`) : 'border-transparent'}`} 
                  onClick={() => handleYearChange(year)}
                >
                  {year} {year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} year
                </button>
              ))}
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
              <tr className={`flex justify-between items-center bg-opacity-25 p-2 ${isDarkMode ? `text-[#FFE714] bg-[#FFE714]` : `text-[#044721] bg-[#044721]`} rounded-t-md`}>
                <th className='data items-center'>Course Code</th>
                <th className='data items-center'>Course Name</th>
                <th className='data items-center'>Credits</th>
                <th className='data items-center'>Grades</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {courses.length > 0 ? courses.map((course, index) => (
                <tr className='row' key={index}>
                  <td className='data p-1 items-center'>{course.course_code}</td>
                  <td className='data p-1 items-center text-center'>{course.course_name}</td>
                  <td className='data p-1 items-center'>{course.credits}</td>
                  <td className='data p-1 items-center'>{course.grade}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className='data p-1 text-center'>No courses available for this semester.</td>
                </tr>
              )}
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
    </div>
  );
}