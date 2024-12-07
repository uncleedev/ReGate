"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersCss } from '@/constants/officers';
export default function CssPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/css/css-banner.jpg")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/css/css-logo.png")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >Computer Students' Society <span>(CSS)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              cdm.icsfaculty@gmail.com
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
         <p>Welcome to the ICS - Computer Students' Society, a vibrant community of students passionate about technology, programming, and innovation. Our society serves as a platform for students to collaborate, learn, and grow in the field of computer science and information technology. We aim to foster a supportive environment where members can share ideas, work on projects, and enhance their skills.</p>
         <br />
         <h3>Mission</h3>
         <p>The mission of the ICS - Computer Students' Society is to promote interest in computer science and technology among students, provide opportunities for professional development, and encourage collaboration on projects and initiatives. We strive to create a community that inspires creativity, critical thinking, and a passion for technology.</p>
         <br />
         <h3>Officers</h3>
         <p>The officers of the Computer Students' Society are dedicated leaders who work to represent the interests of our members and facilitate various activities and programs. Each officer plays a crucial role in governance, event organization, and member engagement.</p>
         <br />
         <h3>Committees</h3>
         <p>Our society is supported by various committees that focus on specific areas of interest within computer science and technology. These committees work collaboratively to organize events, workshops, and projects that benefit our members and the broader community.</p>
         <br />
         <h3>Join Us</h3>
         <p>We invite all students interested in computer science and technology to join the ICS - Computer Students' Society! Whether you are a beginner or an experienced programmer, your involvement can make a difference. Together, we can explore new technologies, collaborate on exciting projects, and build a strong network of future tech leaders.</p>
         
        </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersCss.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
