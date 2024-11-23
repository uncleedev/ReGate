"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersCDMSSG, officersCss } from '@/constants/officers';
export default function CdmssgPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/cdmssg/cdmssg-banner.jpg")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/cdmssg/cdmssg-logo.png")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >Colegio de Montalban Supreme Student Government <span>(CDMSSG)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              cdmssg.cdm.edu@gmail.com
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
          <p>Welcome to the Colegio de Montalban Supreme Student Government (SSG), the official student body representing the voices and interests of all students at our institution. Our SSG is dedicated to fostering a positive school environment, promoting student engagement, and advocating for the needs and concerns of our fellow students.</p>
          <br />
          <h3>Mission</h3>
          <p>The mission of the Colegio de Montalban Supreme Student Government is to empower students by providing a platform for their voices to be heard, facilitating leadership development, and enhancing the overall educational experience. We strive to create a supportive community that encourages collaboration, innovation, and active participation in school activities.</p>
          <br />
          <h3>Officers</h3>
          <p>The officers of the Supreme Student Government are committed leaders who work diligently to represent the student body and implement initiatives that benefit all students. Each officer plays a vital role in governance, event planning, and communication.</p>
          <br />
          <h3>Committees</h3>
          <p>The SSG is supported by various committees that focus on specific areas of student life and development. These committees work collaboratively to organize events, gather feedback, and implement initiatives that enhance the student experience.</p>
          <br />
          <h3>Join Us</h3>
          <p>We invite all students at Colegio de Montalban to get involved with the Supreme Student Government! Whether you want to run for a position, join a committee, or simply share your ideas, your participation is essential to our mission. Together, we can create a vibrant and inclusive school community that enhances our educational experience.</p>                
        </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersCDMSSG.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
