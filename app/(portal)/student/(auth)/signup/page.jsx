"use client"

import AuthLayout from '@/components/portal/AuthLayout'
import { Colors } from '@/constants/colors'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function StudentSignUpPage() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center p-24 w-full h-full bg-[#f1f1f1]">
      <div className='shadow-md rounded-md w-full h-full grid grid-cols-2 bg-white'>
        <div className={`col-span-1 bg-[${Colors.primary}] flex justify-center items-center rounded-md`}>
          <Image src={require("@/public/images/signup.svg")} />
          {/* <Image src={require("@/public/images/prrc-building.jpeg")} className='w-full h-full opacity-5'/> */}
        </div>
        <div className='col-span-1 w-full flex flex-col items-center gap-12 p-24'>
          <h2 className=''>Sign-up to your account</h2>

          <form action="" className='w-full flex flex-col gap-6'>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Student No. :</label>
                <input className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' type="text" />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Email :</label>
                <input className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' type="email" />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Password :</label>
                <div className='relative'>
                  <input 
                    className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg w-full' 
                    type={showPassword ? "text" : "password"} 
                  />
                  <span 
                    onClick={togglePasswordVisibility} 
                    className='absolute right-3 top-3 cursor-pointer'
                  >
                    {showConfirmPassword ? <HiEye /> :  <HiEyeOff /> }
                  </span>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Confirm Password :</label>
                <div className='relative'>
                  <input 
                    className='p-2 rounded-lg shadow shadow-black focus:outline-[#FFE714] w-full' 
                    type={showConfirmPassword ? "text" : "password"} 
                  />
                  <span 
                    onClick={toggleConfirmPasswordVisibility} 
                    className='absolute right-3 top-3 cursor-pointer'
                  >
                    {showConfirmPassword ? <HiEye /> :  <HiEyeOff /> }
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 justify-center'>
              <p className='text-red-600'>Error message</p>
              <button className={`w-full text-center font-semibold hover:border-[#FFE714] border-2 p-3 rounded-lg text-white bg-[${Colors.primary}]`} onClick={() => router.replace("/student/dashboard")}>Sign Up</button>
              <span className='place-self-center'>Already have an Account? <Link href="/student/signin" className={`text-[${Colors.primary}]`}>Sign in</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}