"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnnouncementsIdPage() {
  const [announcements, setAnnouncements] = useState([]);
  const pathname = usePathname();

  const announcmentId = pathname.split('/').pop();

  useEffect(() => {
    const fetchannouncements = async () => {
      try {
        const res = await fetch("/api/announcements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        const announcment = data?.find(item => item._id === announcmentId);

        if (!announcment) {
          throw new Error('announcment event not found');
        }

        setAnnouncements(announcment);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAnnouncements(null); 
      }
    };

    fetchannouncements();
  }, [announcmentId]); 

  if (!announcements) {
    return <p>Loading...</p>
  }

  return (
    <div className="w-full">
      <Image 
        src={announcements.image}
        height={520}
        width={520} 
        alt={announcements.headline}
        className="w-full" 
      />
      <h2 className='mt-6'>{announcements.headline}</h2>
      <h4 className="mt-2 text-gray-600"><span >Date Posted: </span> {new Date(announcements.createdAt).toLocaleDateString()}</h4> 
      <h4 className="mt-2 text-gray-600"> <span>Event Date: </span> {new Date(announcements.date).toLocaleDateString()}</h4>
      <p className="mt-4 text-justify">{announcements.caption}</p>
    </div>
  );
}