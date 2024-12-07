"use client";

import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CardSchedule from '@/components/portal/CardSchedule';
import { cardColors } from '@/constants/cardColors';

export default function ScheduleComponent({ user }) {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [instructor, setInstructor] = useState(null);
    const [mySchedules, setMySchedules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const instructorRes = await fetch("/api/instructors", { method: "GET" });
                if (!instructorRes.ok) throw new Error('Network response was not ok');
                const instructorData = await instructorRes.json();
                const foundInstructor = instructorData.data.instructors.find(item => item.instructorNo === user.instructorNo);
                setInstructor(foundInstructor);

                const scheduleRes = await fetch("/api/schedules", { method: "GET" });
                if (!scheduleRes.ok) throw new Error('Network response was not ok');
                const scheduleData = await scheduleRes.json();
                setSchedules(scheduleData.data.schedules);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        if (schedules.length > 0 && instructor) {
            const mySchedules = schedules.filter(schedule => 
                instructor.handle_courses.some(course => 
                    course.sections.includes(schedule.section) && schedule.course_code === course.course_code
                )
            );
            setMySchedules(mySchedules);
        }
    }, [schedules, instructor]);

    const filteredSchedules = schedules.filter(schedule => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            schedule.room_no.toLowerCase().includes(lowerCaseQuery) ||
            schedule.course_code.toLowerCase().includes(lowerCaseQuery) ||
            schedule.section.toLowerCase().includes(lowerCaseQuery) ||
            schedule.instructor_name.toLowerCase().includes(lowerCaseQuery) ||
            schedule.class_day.join(',').toLowerCase().includes(lowerCaseQuery) ||
            (schedule.time.start_time + " - " + schedule.time.end_time).toLowerCase().includes(lowerCaseQuery)
        );
    });

    if (!instructor) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`p-6 h-full w-full ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f1f1f1] text-black'}`}>
            <div className='flex flex-col gap-4 h-full w-full'>
                <div className='flex flex-col gap-3 h-full w-full'>
                    <div className='flex items-center justify-between'>
                        <h3>Schedules</h3>
                        <div className={`w-[300px] flex items-center ${isDarkMode ? 'bg-[#282828] text-white' : 'bg-white text-black'} pl-3 gap-2 rounded-md shadow`}>
                            <Image src={require("@/public/icons/search-dark.png")} alt="search" height={24} width={24} />
                            <input 
                                type="text"  
                                placeholder='Search' 
                                className='p-3 focus:outline-none rounded-md bg-transparent' 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-5 pb-10 gap-4 h-full'>
                        <div className='col-span-2 flex flex-col gap-3 h-full overflow-scroll hide-scrollbar'>
                            {mySchedules.map((schedule, index) => (
                                <CardSchedule 
                                    key={schedule.id}
                                    color={cardColors[index % cardColors.length]}
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
                            ))}
                        </div>
                        <div className='col-span-3 flex items-end flex-col gap-4 w-full overflow-hidden'>
                            <table className={`${isDarkMode ? 'bg-[#282828] text-white' : 'bg-white text-black'} h-full w-full shadow-md rounded -md flex flex-col items-center overflow-scroll hide-scrollbar relative`}>
                                <thead className='w-full flex items-center justify-center sticky top-0 left-0'>
                                    <tr className={`flex justify-between items-center p-2 bg-opacity-25 ${isDarkMode ? 'text-[#FFE714] bg-[#FFE714]' : 'text-[#044721] bg-[#044721]'} rounded-t-md w-full`}>
                                        <th className='data items-center'>Room No.</th>
                                        <th className='data items-center'>Course Code</th>
                                        <th className='data items-center'>Section</th>
                                        <th className='data items-center'>Instructor</th>
                                        <th className='data items-center'>Class Day</th>
                                        <th className='data items-center'>Time</th>
                                    </tr>
                                </thead>
                                <tbody className='w-full flex flex-col items-center justify-center'>
                                    {filteredSchedules.map((schedule) => (
                                        <tr key={schedule.id} className='row w-full'>
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
        </div>
    );
}