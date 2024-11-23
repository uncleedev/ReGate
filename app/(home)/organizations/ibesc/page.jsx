"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersIBESC } from '@/constants/officers';
export default function IBESCPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/ibesc/ibesc-banner.jpg")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/ibesc/ibesc-logo.jpg")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >IBE Student Council <span>(CSS)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              ibestudentcouncil2025@gmail.com
            </span>

            <span className='text-gray-500 flex items-center gap-2'>

              <FaPhoneAlt size={24} />
              +631234567890
            </span>          
          </div>
      </div>
      <div className='grid grid-cols-5 w-full h-full mt-6'>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab dolores veniam voluptatum in culpa autem nihil vitae, rerum corrupti.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab dolores veniam voluptatum in culpa autem nihil vitae, rerum corrupti.</p>
        </div>
        <div className='col-span-3 h-full border-black border-x border-t p-4 text-justify '>
          <h3>Introduction</h3>
          <p>Welcome to the Institute of Business and Entrepreneurship - Student Council, a dynamic body representing the voices and interests of students within our institution. Our council is dedicated to enhancing the student experience by promoting engagement, leadership, and collaboration among students, faculty, and the broader community.</p>
          <br /> 
          <h3>Mission</h3>
          <p>The mission of the Institute of Business and Entrepreneurship - Student Council is to advocate for student needs, foster a sense of community, and create opportunities for personal and professional development. We aim to empower students to take an active role in shaping their educational environment and to prepare them for successful careers in business and entrepreneurship.</p>
          <br /> 
          <h3>Officers</h3>
          <p>The officers of the Student Council are committed leaders who work tirelessly to represent the student body and facilitate initiatives that enhance the overall student experience. Each officer plays a crucial role in governance, event planning, and communication.</p>
          <br /> 
          <h3>Committees</h3>
          <p>Our Student Council is supported by various committees that focus on specific areas of student life and development. These committees work collaboratively to organize events, gather feedback, and implement initiatives that benefit the student community.</p>
          <br /> 
          <h3>Join Us</h3>
          <p>We invite all students at the Institute of Business and Entrepreneurship to get involved with the Student Council! Whether you want to run for a position, join a committee, or simply share your ideas, your participation is vital to our mission. Together, we can create a vibrant and supportive community that enhances our educational experience.</p>
          <br /> 
        </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersIBESC.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
