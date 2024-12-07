"use client"

import Modal from '@/components/portal/Modal'
import { styles } from '@/constants/styleModal'
import { timeAgo } from '@/constants/timeAgo'
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const ITEMS_PER_PAGE = 8


export default function NewsEventSection() {

  const { isDarkMode } = useTheme()

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentItem, setCurrentItem] = useState(null);

  const [headline, setHeadline] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsEvents, setNewsEvents] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newsEvents.length / ITEMS_PER_PAGE);

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

  const filteredItems = newsEvents.filter((item) =>
    item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchNewsEvents = async () => {
      setLoadingData(true);
      try {
        const res = await fetch("/api/news-events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setNewsEvents(data);
      } catch (error) {
        console.error("Error fetching news events:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchNewsEvents();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    setHeadline("");
    setCaption("");
    setDate("");
    setImage("");
    setLoading(false);
    setError("");
    setShowCreateModal(false);
  };

  const handleDelete = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true); 
    try {
      const res = await fetch("/api/news-events", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentItem._id }),
      });

      if (res.ok) {
        setNewsEvents((prev) => prev.filter((item) => item._id !== currentItem._id));
        setShowDeleteModal(false); 
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to delete the news event");
      }
    } catch (error) {
      console.error("Error deleting news event:", error);
      setError("An error occurred while deleting the news event.");
    } finally {
      setLoading(false); 
    }
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setHeadline("");
    setCaption("");
    setDate("");
    setImage("");
    setError("");
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentItem(null);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    checkInput();

    if (error) return;

    try {
      const res = await fetch("/api/news-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline, caption, date, image }),
      });

      if (res.ok) {
        const newEvent = await res.json();
        setNewsEvents((prev) => [...prev, newEvent.newsEvent]);
        handleCloseCreateModal();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setHeadline(item.headline);
    setCaption(item.caption);
    setDate(item.date);
    setImage(item.image);
    setShowEditModal(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    checkInput();

    if (error) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/news-events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentItem._id,
          headline,
          caption,
          date,
          image,
        }),
      });

      if (res.ok) {
        const updatedEvent = await res.json();
        setNewsEvents((prev) =>
          prev.map((event) =>
            event._id === currentItem._id ? updatedEvent.updatedNewsEvent : event
          )
        );
        handleCloseEditModal();
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to update the news event");
      }
    } catch (error) {
      console.error("Error updating news event:", error);
      setError("An error occurred while updating the news event.");
    } finally {
      setLoading(false);
    }
  };

  const checkInput = () => {
    if (!headline || !caption || !image) {
      setError("All fields are required!");
      setLoading(false);
    } else {
      setError("");
    }
  };

  return (
  <>
    <div className={`h-full w-full flex flex-col   gap-4 p-6 ${isDarkMode ? `bg-[#121212] text-white` : `bg-[#f1f1f1] text-black`}`}>
       <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3>News & Events</h3>
          <div className="flex items-center gap-3">
            <div className={`flex items-center ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'} pl-3 gap-2 rounded-md`}>
              <Image src={require("@/public/icons/search-dark.png")} alt="search" height={24} width={24} />
              <input
                type="text"
                placeholder="Search"
                className="p-3 focus:outline-none rounded-md bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => setShowCreateModal(true)} className="bg-blue-700 text-white p-3 rounded-md shadow-sm">Create new</button>
          </div>
        </div>

        <div className={`rounded-md shadow-md ${isDarkMode ? `bg-[#282828] text-white` : 'bg-white text-black'}`}>
          <table className="flex flex-col w-full">
            <thead className="w-full">
              <tr className={`flex justify-between items-center p-2 bg-[#044721] bg-opacity-75 text-white rounded-t-md`}>
                <th className="data items-center">Image</th>
                <th className="data items-center">Title</th>
                <th className="data items-center">Description</th>
                <th className="data items-center"> Event Date</th>
                <th className="data items-center"> Date Posted</th>
                <th className="data items-center">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {loadingData ? (
                <tr>
                  <td colSpan="5" className="text-center">Loading...</td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr className='w-full flex justify-center items-center'>
                  <td colSpan="5" className="text-center p-60">No data found</td>
                </tr>
              ) : (
                currentItems.map(item => (
                  <tr key={item._id} className="row">
                    <td className="data items-center">
                      <Image src={item.image} width={90} height={46} className="object-fit" />
                    </td>
                    <td className="data items-center">{item.headline}</td>
                    <td className="data text-justify overflow-y-scroll hide-scrollbar h-[56px]">{item.caption}</td>
                    <td className="data items-center">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="data items-center">{timeAgo(item.createdAt)}</td>
                    <td className="data items-center flex gap-4">
                      <button onClick={() => handleEdit(item)}>
                        <Image src={require("@/public/icons/edit.png")} height={24} width={24} alt="Edit" />
                      </button>
                      <button onClick={() => handleDelete(item)}>
                        <Image src={require("@/public/icons/delete.png")} height={24} width={24} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-around p-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn">
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal isOpen={showCreateModal} onClose={handleCloseCreateModal} title={"Create new News or Events"}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitCreate}>
          <div style={styles.group}>
            <label style={styles.label}>Headline</label>
            <input style={styles.input} type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Caption</label>
            <textarea style={styles.input} value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}> Event Date</label>
            <input style={styles.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Image</label>
            <input style={styles.input } type="file" onChange={handleFileChange} />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex items-center justify-between gap-3">
            <button style={styles.button} className="bg-red-600" onClick={handleCancel} type="button" disabled={loading}>{loading ? "Loading..." : "Cancel"}</button>
            <button style={styles.button} className="bg-blue-600" type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditModal} onClose={handleCloseEditModal} title={"Edit News or Events"}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitEdit}>
          <div style={styles.group}>
            <label style={styles.label}>Title</label>
            <input style={styles.input} type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Description</label>
            <textarea style={styles.input} value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Event Date</label>
            <input style={styles.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Image</label>
            <input style={styles.input} type="file" onChange={handleFileChange} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={handleCloseEditModal} style={styles.button} className="bg-red-600" disabled={loading}>{loading ? "Loading..." : "Cancel"}</button>
            <button type="submit" style={styles.button} className="bg-blue-600" disabled={loading}>{loading ? "Loading..." : "Save Changes"}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title={"Confirm Delete"}>
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete the item headline: " <span className="font-semibold">{currentItem?.headline}</span>"?</p>
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => setShowDeleteModal(false)} style={styles.button} className="bg-red-600"disabled={loading}>{loading ? "Loading..." : "Cancel"}</button>
            <button onClick={handleConfirmDelete} style={styles.button} className="bg-blue-600"disabled={loading}>{loading ? "Loading..." : "Delete"}</button>
          </div>
        </div>
      </Modal>
    </>
  )
}

