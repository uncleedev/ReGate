"use client"

// webapp/components/CustomButton.jsx
import { Colors } from '@/constants/colors';
import React from 'react';
import { useTheme } from '@/context/ThemeContext'; // Import the useTheme hook
import Image from 'next/image';

export default function CustomButton({ title, cmStyle, onClick, bgColor, icon }) {
  const { isDarkMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-xl text-lg font-semibold text-left flex gap-2 items-center shadow-lg hover:text-white ${cmStyle} 
        ${isDarkMode ? 'text-white' : 'text-black'} 
        ${isDarkMode ? `hover:bg-[#444]`  : `hover:bg-[${Colors.primary}]`}`}
      style={{ backgroundColor: bgColor }}
    >
      <Image src={icon ? icon : require("@/public/icons/dashboard.png")} height={24} width={24} />
      {title}
    </button>
  );
}