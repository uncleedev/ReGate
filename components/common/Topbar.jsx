"use client"

import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { Colors } from '@/constants/colors';
import { useRouter } from 'next/navigation';

export default function Topbar({ heading, onClick, email, id }) {

  const router = useRouter()

  const { isDarkMode, toggleTheme } = useTheme();
  const [isLogout, setIsLogout] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLogoutDropdown = () => {
    setIsLogout(prev => !prev);
  };

  return (
    <>
      <div className={`w-full relative flex justify-between items-center p-6 shadow-md ${isDarkMode ? `bg-[${Colors.background[1]}]` : 'bg-white'}`}>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{heading}</h2>

        <div className='flex items-center gap-4'>
          <button onClick={toggleTheme} className='flex items-center'>
            {isDarkMode ? (
              <Image src={require("@/public/icons/light.png")} width={24} height={24} alt="Light Mode" />
            ) : (
              <Image src={require("@/public/icons/moon.png")} width={24} height={24} alt="Dark Mode" />
            )}
          </button>
          <h3 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{id}</h3>
          <Image 
            src={require("@/public/images/avatar.png")} 
            onClick={toggleLogoutDropdown} 
            height={40} 
            width={40} 
            alt="Avatar" 
          />
        </div>
        {isLogout && (
          <div 
            ref={dropdownRef} 
            className={`${isDarkMode ?  `bg-[${Colors.background[1]}]` : `bg-white`} p-3 absolute right-[24px] top-[100px] shadow-md flex flex-col gap-2`}
          >
            <p>{email}</p>
            <button className='p-2 bg-red-600 text-white rounded w-full' onClick={onClick}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
}