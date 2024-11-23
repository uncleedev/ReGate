"use client";

import NewsEvent from "@/models/news-events";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsIdPage() {
  const searchParams = useSearchParams();
  const [newsEvents, setNewsEvents] = useState([]);

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
        const newsId = searchParams.get('id')

        const news = data?.find(item => item._id === newsId);

        if (!news) {
          throw new Error('News event not found');
        }

        setNewsEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNewsEvents(null); // Optionally reset state on error
      }
    };

    fetchNewsEvents();
  }, [searchParams.get("id")]);

  // if (!newsEvents) {
  //   return <p>Loading...</p>; // Show a loading state while fetching data
  // }

  return (
    <div className="w-full">
      <h2 className='mt-6'>{newsEvents.headline}</h2>
      {/* <Image 
        src={NewsEvent.image}
        height={520}
        width={520}
        alt={newsEvents.headline}
      /> */}
      {/* // Add alt text for accessibility
      />
      <h4 className="mt-2">{new Date(newsEvents.date).toLocaleDateString()}</h4> {/* Format date */}
      {/*<p className="mt-4 text-justify">{newsEvents.caption}</p> */}
    </div>
  );
}