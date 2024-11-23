"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersEducSociety } from '@/constants/officers';
export default function EducSocietyPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/ite-educsociety/educsociety-banner.jpg")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/ite-educsociety/educsociety-logo.jpg")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >ITE Education Society <span>(EducSociety)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              cdm.instituteofeducation.ioe@gmail.com
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
          <p>Welcome to the Institute of Teacher Education - Education Society, where we are committed to enhancing the quality of teacher education. Our organization serves as a hub for aspiring and experienced educators, providing innovative training, professional development, and opportunities for community engagement. Together, we strive to empower educators with the skills and knowledge necessary to inspire and lead the next generation of learners.</p>
          <br />
          <h4>Mission</h4>
          <p>The mission of the Institute of Teacher Education - Education Society is to enhance the quality of teacher education through innovative training, professional development, and community engagement. We are dedicated to empowering educators with the skills and knowledge necessary to inspire and lead the next generation of learners.</p>
          <br />
          <h4>Officers</h4>
          <p>The officers of the Institute of Teacher Education - Education Society are dedicated leaders who guide the organization in achieving its mission. Each officer plays a vital role in ensuring effective governance, strategic planning, and the successful implementation of programs that enhance teacher education.</p>
          <br />
          <h4>Join Us</h4>
          <p>Our faculty comprises experienced educators and experts in the field of teacher education, committed to providing high-quality instruction and mentorship. They bring a wealth of knowledge and practical experience to our programs, ensuring that our educators are well-prepared to meet the challenges of the classroom.</p>
          <br />
          <h4>Join Us</h4>
          <p>We invite you to become a part of the Institute of Teacher Education - Education Society! Whether you are an aspiring teacher, an experienced educator, or an education advocate, your involvement can make a difference. Join us in our mission to promote educational excellence and empower teachers.</p>
        </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersEducSociety.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
