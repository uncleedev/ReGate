"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { forms } from '@/constants/forms';
import Image from 'next/image';
import Modal from '@/components/portal/Modal';
import { styles } from '@/constants/styleModal';

const ITEMS_PER_PAGE = 11;

export default function RequestsSection() {
  const { isDarkMode } = useTheme();
  
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [studentNo, setStudentNo] = useState("");
  const [email, setEmail] = useState("")
  const [formType, setFormType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState("Complete");

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

  const clearInputs = () => {
    setStudentNo("");
    setFormType("");
    setQuantity(0);
    setPaymentMethod("");
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/request");
        const data = await res.json();
        if (res.ok) {
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchRequests();
  },[createModal, editModal, deleteModal] );

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentNo,
          email,
          formType,
          quantity,
          paymentMethod,
          paymentStatus,
          printStatus
        })
      });

      if (res.ok) {
        setCreateModal(false);
        clearInputs();
      }

    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };  

  const handleEditRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editItem._id,
          receiptNo: editItem.receiptNo,
          studentNo: editItem.studentNo,
          formType: editItem.formType,
          quantity: editItem.quantity,
          paymentMethod: editItem.paymentMethod,
          paymentStatus: editItem.paymentStatus,
          printStatus: editItem.printStatus
        })
      });

      if (res.ok) {
        setEditModal(false);
        clearInputs();
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/request", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: deleteItem._id })
      });

      if (res.ok) {
        setDeleteModal(false);
        setDeleteItem(null);
      }
    } catch (error) {
      console.error("Error deleting request: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, updatedData) => {
    try {
      const res = await fetch("/api/request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, ...updatedData })
      });
  
      if (!res.ok) {
        throw new Error("Failed to update request");
      }
  
      const data = await res.json();
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };
  
  const handlePaymentStatusChange = (item, e) => {
    const updatedPaymentStatus = e.target.value === 'true';
    const updatedItems = requests.map(i => i._id === item._id ? { ...i, paymentStatus: updatedPaymentStatus } : i);
    setRequests(updatedItems);
    handleUpdateStatus(item._id, { paymentStatus: updatedPaymentStatus });
  };
  
  const handlePrintStatusChange = (item, e) => {
    const updatedPrintStatus = e.target.value;
    const updatedItems = requests.map(i => i._id === item._id ? { ...i, printStatus: updatedPrintStatus } : i);
    setRequests(updatedItems);
    handleUpdateStatus(item._id, { printStatus: updatedPrintStatus });
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    handleDeleteRequest();
  };

  const handlePrint = async (studentNo, formType, item) => {
    // Set print status to "Ongoing"
    handlePrintStatusChange(item, { target: { value: "Ongoing" } });
  
    try {
      const response = await fetch(`http://localhost:3007/${formType.toLowerCase()}.php`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const content = await response.text();
      console.log(content); // Debugging: log the content
  
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Failed to open print window. Please check your popup blocker settings.');
      }
  
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
            <style>
              /* Add any necessary styles here */
            </style>
          </head>
          <body>
            student data ${studentNo}
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
  
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          handlePrintStatusChange(item, { target: { value: "Complete" } });
        }, 500);
      };
  
      printWindow.onbeforeunload = () => {
        handlePrintStatusChange(item, { target: { value: "Pending" } });
      };
    } catch (error) {
      console.error('Error fetching the PHP file:', error);
      handlePrintStatusChange(item, { target: { value: "Pending" } });
    }
  };

  const filteredItems = requests.filter(item =>
    item.formType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className={`h-full w-full flex flex-col   gap-4 p-6 ${isDarkMode ? `bg-[#121212] text-white` : `bg-[#f1f1f1] text-black`}`}>
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
                <tr key={item._id} className='row'>
                  <td className='data items-center'>{item.receiptNo}</td>
                  <td className='data items-center'>{item.studentNo}</td>
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
                    <select
                      name="payment"
                      value={item.paymentStatus.toString()}
                      onChange={(e) => handlePaymentStatusChange(item, e)}
                      className={`p-1 rounded focus:outline-none ${item.paymentStatus ? `bg-[#044721] border-[#044721]` : `bg-red-600 border-red-600`} bg-opacity-25 border`}
                    >
                      <option value={'true'}>Paid</option>
                      <option value={'false'}>Unpaid</option>
                    </select>
                  </td>
                  <td className='data items-center'>
                    <select
                      name="status"
                      value={item.printStatus}
                      disabled={!item.paymentStatus}
                      onChange={(e) => handlePrintStatusChange(item, e)}
                      className={`p-1 rounded focus:outline-none bg-opacity-25 border ${
                        item.printStatus === "Complete"
                          ? `bg-[#044721] border-[#044721]`
                          : item.printStatus === "Pending"
                          ? `bg-orange-600 border-orange-600`
                          : `bg-red-600 border-red-600`
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Complete">Complete</option>
                      <option value="Rejected">Ongoing</option>
                    </select>
                  </td>
                  <td className='data items-center'>
                  <button
                    disabled={!item.paymentStatus}
                    onClick={() => handlePrint(item.studentNo, item.formType, item)}
                    className={`${!item.paymentStatus ? `opacity-25` : ``}`}
                  >
                    <Image src={require("@/public/icons/printer.png")} className='h-6 w-6' />
                  </button>
                  </td>
                  <td className='data items-center flex gap-4'>
                    <button
                      onClick={() => {
                        setEditItem(item);
                        setEditModal(true);
                      }}
                      disabled={item.status === 'Done'}
                      className={`${item.status === 'Done' ? `opacity-25` : ``}`}
                    >
                      <Image src={require("@/public/icons/edit.png")} height={24} width={24} alt="Edit" />
                    </button>
                    <button onClick={() => {
                      setDeleteItem(item);
                      setDeleteModal(true);
                    }}>
                      <Image src={require("@/public/icons/delete.png")} height={24} width={24} alt="Delete" />
                    </button>
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

      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title={"Create new Request"}>
        <form className='flex flex-col gap-4' onSubmit={handleCreateRequest}>
          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Student No.</label>
            <input 
              style={styles.input} 
              type="text"
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)} 
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Email</label>
            <input 
              style={styles.input} 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Form Type</label>
            <select 
              style={styles.input}
              onChange={(e) => setFormType(e.target.value)}
            >
              <option disabled selected>Select Form Type</option>
              <option value="Sample1">Sample1</option>
              <option value="Sample2">Sample2</option>
              <option value="Sample3">Sample3</option>
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Quantity</label>
            <input 
              style={styles.input} 
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          
          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Payment</label>
            <select 
              style={styles.input}
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="default" disabled>Select your payment method</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className='flex items-center justify-between gap-3'>
            <button onClick={() => setCreateModal(false)} style={styles.button} className='bg-red-600'>Cancel</button>
            <button 
              style={styles.button} 
              className='bg-blue-600'
              type='submit'
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title={"Edit Request"}>
        <form className='flex flex-col gap-4' onSubmit={handleEditRequest}>
          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Student No.</label>
            <input 
              style={styles.input} 
              type="text" 
              value={editItem?.studentNo || ''} 
              onChange={(e) => setEditItem({ ...editItem, studentNo: e.target.value })} 
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label} htmlFor="">Form Type</label>
            <select 
              style={styles.input} 
              value={editItem?.formType || ''} 
              onChange={(e) => setEditItem({ ...editItem, formType: e.target.value })}
            >
              <option disabled value="default">Select Form Type</option>
              <option value="Sample 1">Sample 1</option>
              <option value="Sample 2">Sample 2</option>
              <option value="Sample 3">Sample 3</option>
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
            <button onClick={() => setEditModal(false)} style={styles.button} className='bg-red-600'>Cancel</button>
            <button style={styles.button} className='bg-blue-600' type="submit">Save Changes</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title={"Confirm Deletion"}>
        <div className='flex flex-col gap-4'>
            <p>Are you sure you want to delete this item with Receipt No: <strong>{deleteItem?.receiptNo}</strong>?</p>
            <div className='flex items-center justify-between gap-3'>
                <button onClick={() => setDeleteModal(false)} style={styles.button} className='bg-red-600'>Cancel</button>
                <button onClick={confirmDelete} style={styles.button} className='bg-blue-600'>Delete</button>
            </div>
        </div>
      </Modal>

    </div>
  );
}
