"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersSportClub } from '@/constants/officers';
export default function SportsClubPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/sportclub/sportsclub-banner.jpg")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/sportclub/sportsclub-logo.jpg")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >CdM Panthers - Sports Club  <span>(SportsClub)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              sportsclubcdm@gmail.com
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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil voluptatem quasi vero culpa perspiciatis dolores ipsa quod. Aut, iusto magni aspernatur nihil fugit eum veritatis ipsum ipsam in temporibus laboriosam..</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab dolores veniam voluptatum in culpa autem nihil vitae, rerum corrupti.</p>
        </div>
        <div className='col-span-3 h-full border-black border-x border-t p-4 text-justify '>
          <h3>Introduction</h3>
          <p>Welcome to the CdM Panthers Sports Club! We are dedicated to promoting sports, wellness, and personal growth among our members. Our club serves as a vibrant community where students can engage in various athletic activities, develop their skills, and build lifelong friendships.</p>
          <br />
          <h4>Our Mission</h4>
          <p>At CdM Panthers, our mission is to foster teamwork, sportsmanship, and camaraderie among all students. We believe that participation in sports not only enhances physical fitness but also cultivates essential life skills such as discipline, resilience, and collaboration.</p>
          <br />
          <h4>Our Community</h4>
          <p>The CdM Panthers Sports Club is more than just a sports organization; it’s a community. We bring together students, families, and supporters who share a passion for sports and personal development. Through our events and activities, we create an inclusive environment where everyone feels welcome and valued..</p>
          <br />
          <h4>Join Us</h4>
          <p>We invite you to be a part of the CdM Panthers Sports Club! Whether you’re looking to compete, stay active, or simply have fun, we have a place for you. Join us in our mission to promote sports, wellness, and personal growth.</p>
          <p>For more information about our programs, schedules, and membership opportunities, please visit our club and contact us directly. Together, let’s embrace the Panther spirit and achieve greatness on and off the field!</p>
          <br />
          </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersSportClub.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
