"use client"

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export default function AdminSigninForm() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (email === "" || password === "") {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        role: 'admin',
        redirect: false
      })

      if (res.error) {
        setError("Invalid Credentials!");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Sign-in error:", error);
      setLoading(false);
      return
    }
  }

  return (
    <div className="flex justify-center items-center p-24 w-full h-full bg-[#f1f1f1]">
      <div className='shadow-md rounded-md w-full h-full grid grid-cols-2 bg-white'>
          <div className='col-span-1 w-full flex flex-col items-center gap-12 p-24'>
              <h2>Sign-in to your account</h2>
              <form onSubmit={handleSignin} className='w-full flex flex-col gap-6'>
                  <div className='flex flex-col gap-4'>
                      <label>Email :</label>
                      <input 
                          className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' 
                          type="email"
                          value={email}
                          onChange={(e) => {
                              setEmail(e.target.value);
                              setError("");
                          }} 
                      />
                      <label>Password :</label>
                      <div className='relative'>
                          <input 
                              className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg w-full' 
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                  setPassword(e.target.value);
                                  setError("");
                              }} 
                          />
                          <span 
                              onClick={togglePasswordVisibility} 
                              className='absolute right-3 top-3 cursor-pointer'
                          >
                              {showPassword ? <HiEye /> : <HiEyeOff />}
                          </span>
                      </div>

                      
                  </div>

                  <div className='flex flex-col gap-2 justify-center'>
                      {error && <p className='text-red-600'>{error}</p>}
                      <button 
                          className={`w-full text-center font-semibold border-2 p-3 rounded-lg text-white ${loading ? 'bg-gray-400' : `bg-[#044721]`}`}
                          disabled={loading}
                      >
                          {loading ? "Loading..." : "Sign In"}
                      </button>
                  </div>
              </form>
              
              <span className='place-self-start'>
                  Go Back to <Link href="/" className={`text-[#044721]`}>Homepage</Link>
              </span>
          </ div>
          <div className={`col-span-1 bg-[#044721] flex justify-center items-center rounded-md`}>
              <Image src={require("@/public/images/signin.svg")} />
          </div>
      </div>
    </div>
  )
}
