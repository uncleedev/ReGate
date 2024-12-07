"use client";

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Colors } from '@/constants/colors';

export default function StudentSigninForm() {
    const router = useRouter();
    const [studentNo, setStudentNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlesignin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (studentNo === "" || email === "" || password === "") {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const res = await signIn("credentials", {
                studentNo,
                email,
                password,
                role: 'student',
                redirect: false
            });

            if (res.error) {
                setError("Invalid Credentials!");
                setLoading(false);
                return;
            }

            router.push("/student/dashboard");
        } catch (error) {
            console.error("Sign-in error:", error);
            setLoading(false);
            return
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center p-24 w-full h-full bg-[#f1f1f1]">
            <div className='shadow-md rounded-md w-full h-full grid grid-cols-2 bg-white'>
                <div className='col-span-1 w-full flex flex-col items-center gap-12 p-24'>
                    <h2>Sign-in to your account</h2>
                    <form onSubmit={handlesignin} className='w-full flex flex-col gap-6'>
                        <div className='flex flex-col gap-4'>
                            <label>Student No. :</label>
                            <input 
                                className='p-2 shadow shadow-black focus:outline-[#FFE714] rounded-lg' 
                                type="text" 
                                value={studentNo}
                                onChange={(e) => {
                                    setStudentNo(e.target.value);
                                    setError("");
                                }}
                            />
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
                            <span className='place-self-center'>
                                Don't have an Account? <Link href="/student/signup" className={`text-[#044721]`}>Sign up</Link>
                            </span>
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
    );
}