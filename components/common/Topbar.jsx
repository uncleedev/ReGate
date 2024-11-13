"use client"

import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import React from 'react';
import { Colors } from '@/constants/colors';

export default function Topbar({heading}) {
  const { isDarkMode, toggleTheme } = useTheme(); 

  return (
    <div className={`w-full flex justify-between items-center p-6 shadow-md ${isDarkMode ? `bg-[${Colors.background[1]}]` : 'bg-white'}`}>
      <h2 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{heading}</h2>

      <div className='flex items-center gap-4'>
        <button onClick={toggleTheme} className='flex items-center'>
          {/* Show moon icon if in light mode, otherwise show light icon */}
          {isDarkMode ? (
            <Image src={require("@/public/icons/light.png")} width={24} height={24} alt="Light Mode" />
          ) : (
            <Image src={require("@/public/icons/moon.png")} width={24} height={24} alt="Dark Mode" />
          )}
        </button>
        <h3 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>22-01383</h3>
        <Image src={require("@/public/images/avatar.png")} height={40} width={40} alt="Avatar" />
        {/* <svg className='w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg> */}
      </div>
    </div>
  );
}