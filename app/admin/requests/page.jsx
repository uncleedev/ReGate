"use client"

import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/context/ThemeContext';
import { requests } from '@/sample/data';
import Image from 'next/image';

const ITEMS_PER_PAGE = 9;

export default function AdminRequestsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isDarkMode } = useTheme();

  const [items, setItems] = useState(requests.map(item => ({
    ...item,
    isPaid: item.payment_status.toString(),
    status: item.status
  })));

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedItems = items.map(req => req.id === editItem.id ? { ...editItem } : req);
    setItems(updatedItems);
    setEditModalOpen(false);
  };

  const handleDeleteClick = (item) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedItems = items.filter(req => req.id !== deleteItem.id);
    setItems(updatedItems);
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

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

  // PRICES
  const forms = [
    {
      type: "Form 137",
      price: 10,
    },
    {
      type: 'OVRF',
      price: 25,
    },
    {
      type: 'Form 1',
      price: 10,
    },
  ]

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
              < tr className={`flex justify-between items-center bg-[${Colors.primary}] text-white rounded-t-md`}>
                <th className='data items-center'>Receipt no.</th>
                <th className='data items-center'>Student no.</th>
                <th className='data items-center'>Form Type</th>
                <th className='data items-center'>Price | Qty | Total</th>
                <th className='data items-center'>Payment Method</th>
                <th className='data items-center'>Print Status</th>
                <th className='data items-center'>Print</th>
                <th className='data items-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {currentItems.map(item => (
                <tr key={item.id} className='row'>
                  <td className='data items-center'>{item.requests_no}</td>
                  <td className='data items-center'>{item.student_no}</td>
                  <td className='data items-center'>{item.form_type}</td>
                  {forms.map((form) => (
                    form.type === item.form_type ? (
                      <td className='data items-center' key={form.type}>
                        <span>₱ {form.price}</span> &nbsp;| &nbsp; <span>x{item.quantity}</span> &nbsp;| &nbsp; <span>₱ {form.price * item.quantity}</span>
                      </td>
                    ) : null
                  ))}
                  <td className='data items-center'>
                    <span>{item.payment_method}</span> &nbsp;| &nbsp;
                    <select
                      name="payment"
                      value={item.isPaid}
                      onChange={(e) => {
                        const updatedItems = items.map(i => i.id === item.id ? { ...i, isPaid: e.target.value } : i);
                        setItems(updatedItems);
                      }}
                      className={`p-1 rounded focus:outline-none ${item.isPaid === 'true' ? `bg-[${Colors.primary}] border-[${Colors.primary}]` : `bg-red-600 border-red-600`} bg-opacity-25 border`}
                    >
                      <option value={'true'}>Paid</option>
                      <option value={'false'}>Unpaid</option>
                    </select>
                  </td>
                  <td className='data items-center'>
                    <select
                      name="status"
                      value={item.status}
                      disabled={item.isPaid !== 'true'}
                      onChange={(e) => {
                        const updatedItems = items.map(i => i.id === item.id ? { ...i, status: e.target.value } : i);
                        setItems(updatedItems);
                      }}
                      className={`p-1 rounded focus:outline-none bg-opacity-25 border ${
                        item.status === "Completed"
                          ? `bg-[${Colors.primary}] border-[${Colors.primary}]`
                          : item.status === "Pending"
                          ? `bg-orange-600 border-orange-600`
                          : `bg-red-600 border-red-600`
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className='data items-center'>
                    <button
                      disabled={item.isPaid !== 'true'}
                      onClick={() => handlePrint(item.student_no)}
                      className={`${item.isPaid !== 'true' ? `opacity-25` : ``}`}
                    >
                      <Image src={require("@/public/icons/printer.png")} className='h-6 w-6' />
                    </button>
                  </td>
                  <td className='data items-center flex gap-4'>
                    <button
                      onClick={() => handleEditClick(item)}
                      disabled={item.status === 'Done'}
                      className={`${item.status === 'Done' ? `opacity-25` : ``}`}
                    >
                      <Image src={require("@/public/icons/edit.png")} height={24} width={24} alt="Edit" />
                    </button>
                    <button onClick={() => handleDeleteClick(item)}>
                      <Image src={require("@/public/icons/delete.png")} height={24} width={24} alt="Delete" />
                    </button>
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

      < Modal isOpen={showModal} onClose={() => setShowModal(false)} title={"Create new Announcement"}>
        <form className='flex flex-col gap-4'>
          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Student No.</label>
            <input style={styles.input} type="text" />
          </div>

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

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title={"Edit Request"}>
        <form className='flex flex-col gap-4' onSubmit={handleEditSubmit}>
          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Student No.</label>
            <input 
              style={styles.input} 
              type="text" 
              value={editItem?.student_no || ''} 
              onChange={(e) => setEditItem({ ...editItem, student_no: e.target.value })} 
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Form Type</label>
            <select 
              style={styles.input} 
              value={editItem?.form_type || ''} 
              onChange={(e) => setEditItem({ ...editItem, form_type: e.target.value })}
            >
              <option disabled value="default">Select Form Type</option>
              <option value="OVRF">OVRF</option>
              <option value="Form 137">Form 137</option>
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Quantity</label>
            <input 
              style={styles.input} 
              type="number" 
              value={editItem?.quantity || ''} 
              onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })} 
            />
          </div>

          <div className='flex items-center justify-between gap-3'>
            <button onClick={() => setEditModalOpen(false)} style={styles.button} className='bg-red-600'>Cancel</button>
            <button style={styles.button} className='bg-blue-600' type="submit">Save Changes</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={handleCancelDelete} title={"Confirm Deletion"}>
        <div className='flex flex-col gap-4'>
            <p>Are you sure you want to delete this item with Receipt No: <strong>{deleteItem?.requests_no}</strong>?</p>
            <div className='flex items-center justify-between gap-3'>
                <button onClick={handleCancelDelete} style={styles.button} className='bg-red-600'>Cancel</button>
                <button onClick={confirmDelete} style={styles.button} className='bg-blue-600'>Delete</button>
            </div>
        </div>
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