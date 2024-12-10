"use client"

import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import HeroSection from '@/components/home/HeroSection'
import { libraries } from '@/constants/libraries'
import Link from 'next/link'
import React, { useState } from 'react'

export default function ELibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLibraries = libraries.filter(library =>
    library.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLibraries.length / itemsPerPage);

  const currentLibraries = filteredLibraries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <HeroSection heading={"E-Library"} />
      <section className='paddingvr'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 mb-4 "
        />
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white border border-gray-200 shadow-md'>
            <thead>
              <tr className='bg-[#044721] text-[#044721] bg-opacity-25'>
                <th className='p-3 text-left'>Title</th>
                <th className='p-3 text-left'>Link</th>
              </tr>
            </thead>
            <tbody>
              {currentLibraries.length > 0 ? (
                currentLibraries.map((library) => (
                  <tr key={library.id} className='border-b hover:bg-gray-100'>
                    <td className='p-3'>{library.title}</td>
                    <td className='p-3'>
                      <Link className='bg-[#044721] text-white p-2 rounded-md shadow-md hover:bg-[#FFE714] hover:text-[#044721]' href={library.link}>
                        Read More
                      </Link>
                    </td>   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-3 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#044721] text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}