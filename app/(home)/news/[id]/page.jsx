"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsIdPage() {
  const [newsEvents, setNewsEvents] = useState([]);
  const pathname = usePathname();

  const newsId = pathname.split('/').pop();

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        const res = await fetch("/api/news-events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        const news = data?.find(item => item._id === newsId);

        if (!news) {
          throw new Error('News event not found');
        }

        setNewsEvents(news);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNewsEvents(null); 
      }
    };

    fetchNewsEvents();
  }, [newsId]); 

  if (!newsEvents) {
    return <p>Loading...</p>
  }

  return (
    <div className="w-full">
      <Image 
        src={newsEvents.image}
        height={520}
        width={520} 
        alt={newsEvents.headline}
        className="w-full" 
      />
      <h2 className='mt-6'>{newsEvents.headline}</h2>
      <h4 className="mt-2 text-gray-600"><span >Date Posted: </span> {new Date(newsEvents.createdAt).toLocaleDateString()}</h4> 
      <h4 className="mt-2 text-gray-600"> <span>Event Date: </span> {new Date(newsEvents.date).toLocaleDateString()}</h4>
      <p className="mt-4 text-justify">{newsEvents.caption}</p>
    </div>
  );
}