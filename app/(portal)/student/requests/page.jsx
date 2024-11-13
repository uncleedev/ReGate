"use client"

import Modal from '@/components/common/Modal';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import React, {useState} from 'react'

export default function StudentRequestPage() {

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false)

  const { isDarkMode } = useTheme()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h3>Requests</h3>
          <div className='flex items-center gap-3'>
            <div className={`flex items-center ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} pl-3 gap-2 rounded-md`}>
                <Image src={require("@/public/icons/search-dark.png")} alt="search" height={24} width={24} />
                <input 
                  type="text"  
                  placeholder='Search' 
                  className='p-3 focus:outline-none rounded-md bg-transparent' 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>
            <button onClick={() => setShowModal(true)} className='bg-blue-700 text-white p-3 rounded-md shadow-sm'>Create new</button>
          </div>
        </div>

        <div className={`rounded-md shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
          <table className={`flex flex-col w-full`}>
            <thead className='w-full'>
              <tr className={`flex justify-between items-center bg-[${Colors.primary}] text-white rounded-t-md`}>
                <th className='data items-center'>Recipt no.</th>
                <th className='data items-center'>Form Type</th>
                <th className='data items-center'>Price | Qty | Total</th>
                <th className='data items-center'>Payment Method</th>
                <th className='data items-center'>Status</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={"Request Form"}>
        
      </Modal>
    </>
  )
}
