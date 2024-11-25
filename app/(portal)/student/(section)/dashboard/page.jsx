"use client";

import PieChartComp from '@/components/charts/PieChartComp';
import SwiperAnnouncement from '@/components/common/SwiperAnnouncement';
import CardSchedule from '@/components/portal/CardSchedule';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react';

export default function StudentDashboardPage() {
  const { isDarkMode } = useTheme(); 
  const { data: session } = useSession();

  const [student, setStudent] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [todaySchedules, setTodaySchedules] = useState([]);
  const email = session?.user?.email;
  const [sample, setSample] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await fetch("http://localhost:3001/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!studentRes.ok) {
          throw new Error('Network response was not ok');
        }

        const studentData = await studentRes.json();
        const foundStudent = studentData.find(item => item.email === email);
        setStudent(foundStudent);

        const scheduleRes = await fetch("http://localhost:3002/schedules", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!scheduleRes.ok) {
          throw new Error('Network response was not ok');
        }

        const scheduleData = await scheduleRes.json();
        setSchedules(scheduleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  useEffect(() => {
    if (schedules.length > 0 && student) {
      const mySchedules = schedules.filter(schedule => 
        student.enrolled.courses.some(course => 
          schedule.section === course.section && schedule.course_code === course.course_code
        )
      );

      const today = getCurrentDay();
      const todayClasses = mySchedules.filter(schedule => 
        schedule.class_day.includes(today)
      );

      setTodaySchedules(todayClasses);

    }
  }, [schedules, student]);

  function getCurrentDay() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date();
    const dayIndex = date.getDay();
    return days[dayIndex];
  }

  return (
    <>
      <div className='grid grid-cols-5 gap-4 h-[40%]'>
        <div className={`col-span-3 ${isDarkMode ? `bg-[${Colors.background[1]}]` : 'bg-white'} shadow-md rounded-lg flex flex-col items-center justify-start p-3 w-full h-full`}>
          <h2 className={`border-b-2 ${isDarkMode ? 'border-[#FFE714]' : `border-[${Colors.primary}]`}  mb-8`}>Announcements</h2>
          <SwiperAnnouncement />
        </div>
        <div className={`col-span-2 ${isDarkMode ? `bg-[${Colors.background[1]}]` : 'bg-white'} shadow-md rounded-lg flex flex-col items-center p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`} inline-block mb-4`}>
            Request Status
          </h2>

          <PieChartComp />
        </div>
      </div>

      <div className='grid grid-cols-5 gap-4 h-[58%]'>
        <div className={`col-span-3 ${isDarkMode ? `bg-[${Colors.background[1]}]` : 'bg-white'} shadow-md rounded-lg flex flex-col items-center gap-4 p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? ` border-[${Colors.accent}]` : `border-[${Colors.primary}]`} inline-block`}>Enrolled Courses</h2>

          <table className='flex flex-col w-full shadow-md rounded-md'>
            <thead className='w-full'>
              <tr className={`flex justify-between items-center bg-opacity-25 p-2 ${isDarkMode ? `text-[#FFE714] bg-[#FFE714]` : `text-[${Colors.primary}] bg-[${Colors.primary}]`} rounded-t-md`}>
                <th className='data items-center'>Course Code</th>
                <th className='data items-center'>Course Name</th>
                <th className='data items-center'>Credits</th>
              </tr>
            </thead>
            <tbody className='w-full overflow-y-auto' style={{ maxHeight: '385px' }}>
              {student?.enrolled?.courses?.length > 0 ? (
                student.enrolled.courses.map((course, index) => (
                  <tr key={index} className='row'>
                    <td className='data p-1 items-center'>{course.course_code}</td>
                    <td className='data p-1 items-center'>{course.course_name}</td>
                    <td className='data p-1 items-center'>{course.credits}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className='data p-1 text-center'>No courses enrolled</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`col-span-2 ${isDarkMode ? `bg-[${Colors.background[1]}]` : 'bg-white'} shadow-md rounded-lg flex flex-col items-center gap-4 p-3`}>
          <h2 className={`border-b-2 ${isDarkMode ? `border-[${Colors.accent}]` : `border-[${Colors.primary}]`} inline-block`}>Today Schedule</h2>
          <div className='flex flex-col gap-3 items-center w-full overflow-y-auto' style={{ maxHeight: '450px' }}>
            {todaySchedules.length > 0 ? (
              todaySchedules.map((schedule, index) => (
                <CardSchedule 
                  key={schedule.id}
                  color={"#ff0000"}
                  course_name={schedule.course_name}
                  course_code={schedule.course_code}
                  building_name={schedule.building_name}
                  room_no={schedule.room_no}
                  section={schedule.section}
                  instructor_name={schedule.instructor_name}
                  class_day={schedule.class_day}
                  start_time={schedule.time.start_time}
                  end_time={schedule.time.end_time}
                />
              ))
            ) : (
              <p className='text-center'>No classes today</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}