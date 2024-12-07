"use client"

import { forms } from '@/constants/forms';
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import CreateRequest from './CreateRequest';
import Link from 'next/link';
import { products } from '@/constants/products';

const ITEMS_PER_PAGE = 11;

export default function RequestsSection({user}) {

    const { isDarkMode } = useTheme()

    const [createModal, setCreateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [studentNo, setStudentNo] = useState("");
    const [formType, setFormType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");

    const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

    const filteredItems = requests.filter(item =>
        item.formType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchRequests = async () => {
          try {
            const res = await fetch("/api/request", {
              method: 'GET',
              headers: {
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await res.json();
            const foundRequests = data.filter(item => item.studentNo === user.studentNo);
            setRequests(foundRequests);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
    
        fetchRequests();
    }, [createModal]);
    

  return (
    <div className={`p-6 h-full w-full flex flex-col gap-4 ${isDarkMode ? `bg-[#121212] text-white` : `bg-[#f1f1f1] text-black`}`}>
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
                    <button onClick={() => setCreateModal(true)} className='bg-blue-700 text-white p-3 rounded-md shadow-sm'>Create new</button>
                </div>
            </div>

            <div className={`rounded-md shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
                <table className={`flex flex-col w-full`}>
                    <thead className='w-full'>
                        <tr className={`flex justify-between items-center p-2 bg-[#044721] bg-opacity-75 text-white rounded-t-md`}>
                            <th className='data items-center'>Receipt no.</th>
                            <th className='data items-center'>Form Type</th>
                            <th className='data items-center'>Price | Qty | Total</th>
                            <th className='data items-center'>Payment Method</th>
                            <th className='data items-center'>Print Status</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {currentItems.map(item => (
                            <tr key={item._id} className='row'>
                            <td className='data items-center'>{item.receiptNo}</td>
                            <td className='data items-center'>{item.formType}</td>
                            {forms.map((form) => (
                                form.type === item.formType ? (
                                <td className='data items-center' key={form.type}>
                                    <span>₱ {form.price}</span> &nbsp;| &nbsp; <span>x{item.quantity}</span> &nbsp;| &nbsp; <span>₱ {form.price * item.quantity}</span>
                                </td>
                                ) : null
                            ))}
                            <td className='data items-center'>
                                <span>{item.paymentMethod}</span> &nbsp;| &nbsp;

                                <span className={`${item.paymentStatus ? `text-[#044721]` : `text-red-600`}`}>{item.paymentStatus ? "Paid" : "Unpaid"}</span>
                            </td>
                            <td className={`data items-center ${item.printStatus === 'Complete' ? `text-[#044721]` : item.printStatus === 'Pending' ? `text-orange-600` : 'text-red-600' } ` }>
                                {item.printStatus}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-around p-4'>
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className='btn'>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className='btn'>
                        Next
                    </button>
                </div>
            </div>
        </div>

        <CreateRequest createModal={createModal} closeModal={() => setCreateModal(false)} user={user} />
    </div>
  )
}
