"use client"

import { Colors } from '@/constants/colors'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function InstructorSignUpForm() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [instructorNo, setInstructorNo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const isPasswordValid = (password) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const number = /[0-9]/;
  
    return minLength.test(password) && upperCase.test(password) && specialChar.test(password) && number.test(password);
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (instructorNo === "" || email === "" || password === "" || confirmPassword === "") {
      setError("Please fill in all fields");
      setLoading(false)
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false)
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters long, contain an uppercase letter, a special character, and a number");
      setLoading(false)
      return;
    }

    try {
        const instructorExistResponse = await fetch("/api/instructor-exists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ instructorNo, email })
        });

        const instructorExist = await instructorExistResponse.json();

        if (instructorExist.instructor) {
            if (instructorExist.instructor.instructorNo === instructorNo) {
                setError("Instructor No. is already registered!");
                setLoading(false)
                return;
            }

            if (instructorExist.instructor.email === email) {
                setError("Email is already registered!");
                setLoading(false)
                return;
            }
        }

        const resInstructors = await fetch("/api/instructors", {
          method: "GET"
        });

        const instructorsData = await resInstructors.json();

        const instructorEnrolled = instructorsData.data.instructors.find(inst => inst.instructorNo === instructorNo);

        if (!instructorEnrolled) {
          setError("Instructor No. is not registered!");
          setLoading(false) 
          return;
        }

        const res = await fetch("/api/instructor", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              instructorNo, email, password
          })
      });

      if (res.ok) {
          setInstructorNo("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError("")
      }
    } catch (error) {
        setError("An error occurred during he registration.");
    } finally {
        setLoading(false);
    }
  };

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
          <Image src={require("@/public/images/signup.svg")} alt="Sign Up" />
        </div>
        <div className='col-span-1 w-full flex flex-col items-center gap-12 p-24'>
          <h2 className=''>Sign-up to your account</h2>

          <form onSubmit={handleSignup} className='w-full flex flex-col gap-6'>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Instructor No. :</label>
                <input 
                  className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' 
                  type="text" 
                  value={instructorNo} 
                  onChange={(e) => {
                    setInstructorNo(e.target.value)
                    setError("")
                  }} 
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Email :</label>
                <input 
                  className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }} 
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Password :</label>
                <div className='relative'>
                  <input 
                    className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg w-full' 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                  />
                  <span 
                    onClick={togglePasswordVisibility} 
                    className='absolute right-3 top-3 cursor-pointer'
                  >
                    {showPassword ? <HiEye /> :  <HiEyeOff /> }
                  </span>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="">Confirm Password :</label>
                <div className='relative'>
                  <input 
                    className='p-2 rounded-lg shadow shadow-black focus:outline-[#FFE714] w-full' 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setError("")
                    }}
                  />
                  <span 
                    onClick={toggleConfirmPasswordVisibility} 
                    className='absolute right-3 top-3 cursor-pointer'
                  >
                    {showConfirmPassword ? <HiEye /> :  <HiEyeOff /> }
                  </span>
                </div>

                {password !== "" && !isPasswordValid(password) && (
                  <ul className="text-sm text-red-600 mt-1">
                    <li>Password must be at least 8 characters long.</li>
                    <li>Password must contain at least one uppercase letter.</li>
                    <li>Password must contain at least one special character (e.g., !, @, #, $, etc.).</li>
                    <li>Password must contain at least one number.</li>
                  </ul>
                )}
              </div>
            </div>

            <div className='flex flex-col gap-2 justify-center'>
              {error && (
                <p className='text-red-600'>{error}</p>
              )}
              <button 
                className={`w-full text-center font-semibold hover:border-[#FFE714] border-2 p-3 rounded-lg text-white ${loading ? `bg-gray-400` : `bg-[${Colors.primary}]`}`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <span className='place-self-center'>Already have an Account? <Link href="/instructor/signin" className={`text-[${Colors.primary}]`}>Sign in</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}