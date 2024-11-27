"use client"

import Modal from '@/components/common/Modal';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { requests } from '@/sample/data';
import { forms } from '@/constants/forms';


const ITEMS_PER_PAGE = 9;


export default function StudentRequestPage() {

  
  const { isDarkMode } = useTheme()
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false)

  const [formType, setFormType] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("")

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState(requests.map(item => ({
    ...item,
    isPaid: item.payment_status.toString(),
    status: item.status
  })));

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const filteredItems = items.filter(item =>
    item.form_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.requests_no.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  


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
              <tr className={`flex justify-between items-center p-2 bg-opacity-25 ${isDarkMode ? `text-[#FFE714] bg-[#FFE714]` : `text-[${Colors.primary}] bg-[${Colors.primary}]`} rounded-t-md`}>
                <th className='data items-center'>Receipt no.</th>
                <th className='data items-center'>Form Type</th>
                <th className='data items-center'>Price | Qty | Total</th>
                <th className='data items-center'>Payment Method</th>
                <th className='data items-center'>Print Status</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {currentItems.map(item => (
                <tr key={item.id} className='row'>
                  <td className='data items-center'>{item.requests_no}</td>
                  <td className='data items-center'>{item.form_type}</td>
                  {forms.map((form) => (
                    form.type === item.form_type ? (
                      <td className='data items-center' key={form.type}>
                        <span>₱ {form.price}</span> &nbsp;| &nbsp; <span>x{item.quantity}</span> &nbsp;| &nbsp; <span>₱ {form.price * item.quantity}</span>
                      </td>
                    ) : null
                  ))}

                  <td className='data items-center'>{item.payment_method} &nbsp;| &nbsp; <span className={`${item.payment_status? `text-green-600` : `text-red-600`}`}>{item.payment_status ? 'Paid' : 'Unpaid'}</span></td>
                
                  <td className={`data items-center ${item.status == 'Completed' ? `text-green-600` : `text-red-600`}`}>
                    {item.status}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-around p-4'>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn'>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn'>
              Next
            </button>
          </div>
        </div>
      </div>

      < Modal isOpen={showModal} onClose={() => setShowModal(false)} title={"Create new Request"}>
        <form className='flex flex-col gap-4'>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Form Type</label>
            <select style={styles.input} name="" id="">
              <option disabled value="default" selected>Select Form Type</option>
              <option value="">OVRF</option>
              <option value="">Form 137</option>
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Quantity</label>
            <input style={styles.input} type="number" name="" id="" />
          </div>
          
          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Payment</label>
            <select style={styles.input} onChange={(e) => e.target.value} name="" id="">
              <option value="default" selected disabled>Select your payment method</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className='flex items-center justify-between gap-3'>
            <button onClick={() => setShowModal(false)} style={styles.button} className='bg-red-600'>Cancel</button>
            <button style={styles.button} className='bg-blue-600'>Submit</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

const styles = {
  label: {
    fontWeight: '700'
  },

  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: 'transparent',
  },

  group: {
    display: ' flex',
    flexDirection: 'column',
    gap: "6px"
  },

  button: {
    width: '100%',
    padding: '12px',
    color: 'white',
    borderRadius: '6px',
  }
}
