"use client"

import { useTheme } from '@/context/ThemeContext';
import React, { useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, children, title }) {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center'>
      <div
        className={`${isDarkMode ? 'bg-[#282828] text-white' : 'bg-white text-black'} p-6 shadow w-[620px] rounded-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className='flex items-center justify-between'>
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <button onClick={onClose}>
            <h2 className='hover:text-red-600'>x</h2>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}