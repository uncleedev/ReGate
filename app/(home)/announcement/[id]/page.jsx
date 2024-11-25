"use client"

import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AnnouncementIdPage() {

  const pathname = usePathname()
  const announcementId = pathname.split('/').pop()

  const [announcement, setAnnouncement] = useState({})

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("/api/announcements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await res.json()

        const announcementData = data?.find(item => item._id === announcementId)
        
        if (!announcementData) {
          throw new Error("Announcement not found")
        }

        setAnnouncement(announcementData)
      } catch (error) {
        console.error("Error fetching data:", error);
        setAnnouncement(null)
      }
    }

    fetchAnnouncement()
  }, [announcementId])



  return (
    <div className="w-full">
      <Image 
        src={announcement.image}
        height={520}
        width={520} 
        alt={announcement.headline}
        className="w-full" 
      />
      <h2 className='mt-6'>{announcement.headline}</h2>
      <h4 className="mt-2">{new Date(announcement.date).toLocaleDateString()}</h4> {/* Format date */}
      <p className="mt-4 text-justify">{announcement.caption}</p>
    </div>
    
  )
}
