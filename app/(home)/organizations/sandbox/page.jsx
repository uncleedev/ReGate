"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersSandbox } from '@/constants/officers';
export default function SandBoxPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/sandbox/sandbox-banner.png")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/sandbox/sandbox-logo.jpg")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >Sandbox - System Developers Club  <span>(CSS)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              sandbox.cdm@gmail.com
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
          <p>Welcome to the Sandbox - System Developers Club, a vibrant community of tech enthusiasts and aspiring developers dedicated to exploring the world of software development. Our club provides a collaborative environment where members can enhance their coding skills, share knowledge, and work on innovative projects that push the boundaries of technology.</p>
          <br />
          <h3>Mission</h3>
          <p>The mission of the Sandbox - System Developers Club is to foster a culture of creativity, collaboration, and continuous learning in the field of software development. We aim to empower our members with the tools and knowledge necessary to excel in their careers, contribute to open-source projects, and develop cutting-edge applications.</p>
          <br />
          <h3>Officers</h3>
          <p>The officers of the Sandbox - System Developers Club are dedicated leaders who guide the organization in achieving its mission. Each officer plays a vital role in ensuring effective governance, strategic planning, and the successful implementation of programs that enhance the skills of our members.</p>
          <br />
          <h3>Mentors</h3>
          <p>Our mentors consist of experienced developers and industry professionals who are committed to guiding our members through their learning journeys. They provide valuable insights, support, and resources to help members navigate the ever-evolving landscape of software development.</p>
          <br />
          <h3>Join Us</h3>
          <p>We invite you to become a part of the Sandbox - System Developers Club! Whether you are a beginner looking to learn the basics or an experienced developer seeking to expand your skills, your involvement can make a difference. Join us in our mission to promote innovation and excellence in software development.</p>
          <br />
        </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersSandbox.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
