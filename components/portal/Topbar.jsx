"use client"

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { signOut } from 'next-auth/react';

export default function Topbar({ heading, email, id, avatar, role }) {
  const router = useRouter();
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

  const getAvatarSrc = () => {
    switch (role) {
      case 'admin':
        return require('@/public/images/admin-avatar.png');
      case 'student':
        return require('@/public/images/student-avatar.png');
      case 'instructor':
        return require('@/public/images/admin-avatar.png');
    }
  };

  return (
    <>
      <div className={`w-full relative z-20 flex justify-between items-center p-6 shadow-md ${isDarkMode ? 'bg-[#282828]' : 'bg-white'}`}>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{heading}</h2>

        <div className='flex items-center gap-4'>
          <button onClick={toggleTheme} aria-label="Toggle theme" className='flex items-center'>
            <Image 
              src={isDarkMode ? require("@/public/icons/light.png") : require("@/public/icons/moon.png")} 
              width={24} 
              height={24} 
              alt={isDarkMode ? "Light Mode" : "Dark Mode"} 
            />
          </button>
          <h3 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{id}</h3>
          <Image 
            src={getAvatarSrc()} 
            onClick={toggleLogoutDropdown} 
            height={40} 
            width={40} 
            alt="User  Avatar" 
            className='cursor-pointer'
          />
        </div>
        
        {isLogout && (
          <div 
            ref={dropdownRef} 
            className={`${isDarkMode ? 'bg-[#282828] text-white' : 'bg-white'} p-3 absolute right-[24px] top-[100px] shadow-md flex flex-col gap-2 z-50`}
          >
            <p>{email}</p>
            <button 
              className='p-2 bg-red-600 text-white rounded w-full' 
              onClick={() => {
                const callbackUrl = role === 'student' ? "/student/signin" : 
                                    role === 'admin' ? "/admin/signin" : 
                                    "/instructor/signin";
                signOut({ redirect: true, callbackUrl });
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}