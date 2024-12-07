"use client"

import { styles } from '@/constants/styleModal'
import React from 'react'

export default function CreateNewsEvents({createModal, closeModal, user }) {
  return (
    <div>
        <Modal isOpen={createModal} onClose={closeModal} title={"Create new News or Events"}>
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
            <label style={styles.label}>Date</label>
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
    </div>
  )
}
