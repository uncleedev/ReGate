"use client"

import AuthLayout from '@/components/portal/AuthLayout'
import { Colors } from '@/constants/colors'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation';
import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function StudentSignInPage() {

  const session = await getServerSession(authOptions)

  if (session) redirect("/student/dashboard")

  const router = useRouter()

  const [studentNo, setStudentNo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const signin =  async (e) => {

    e.preventDefault()

    if (studentNo == "" || email == "" || password == "") {
      setError("Please fill in all fields")
    }

    try {
      const res = await signIn("credentials", {
        studentNo,
        email, 
        password,
        redirect: false
      })

      if (res.error) {
        setError("Invalid Credentials!")
        return
      }

      router.push("/student/dashboard")
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center p-24 w-full h-full bg-[#f1f1f1]">
      <div className='shadow-md rounded-md w-full h-full grid grid-cols-2 bg-white'>
        <div className='col-span-1 w-full flex flex-col items-center gap-12 p-24'>
          <h2 className=''>Sign-in to your account</h2>

          <form onSubmit={signin} className='w-full flex flex-col gap-6'>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Student No. :</label>
                <input 
                  className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' 
                  type="text" 
                  value={studentNo}
                  onChange={(e) => setStudentNo(e.target.value)}
                />
                  
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Email :</label>
                <input 
                  className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Password :</label>
                <div className='relative'>
                  <input 
                    className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg w-full' 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <span 
                    onClick={togglePasswordVisibility} 
                    className='absolute right-3 top-3 cursor-pointer'
                  >
                    {showPassword ? <HiEye /> :  <HiEyeOff /> }
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 justify-center'>
              <button className='place-self-end text-red-600'>Forget Password?</button>
              {error && (
                <p className='text-red-600'>{error}</p>
              )}
              <button 
                className={`w-full text-center font-semibold hover:border-[#FFE714] border-2 p-3 rounded-lg text-white bg-[${Colors.primary}]`}>
                Sign In
              </button>
              <span className='place-self-center'>Don't have an Account? <Link href="/student/signup" className={`text-[${Colors.primary}]`}>Sign up</Link></span>
            </div>
          </form>
        </div>

        <div className={`col-span-1 bg-[${Colors.primary}] flex justify-center items-center rounded-md`}>
          <Image src={require("@/public/images/signin.svg")} />
          {/* <Image src={require("@/public/images/prrc-building.jpeg")} className='w-full h-full opacity-5'/> */}
        </div>
      </div>
    </div>
  )
}