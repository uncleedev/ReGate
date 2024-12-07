"use client"

import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/colors'

import Link from 'next/link'
import CardNews from './CardNews';

export default function NewsEventSection() {
    const [newsEvents, setNewsEvents] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchNewsEvents = async () => {
        try {
          const res = await fetch("/api/news-events", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
  
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await res.json();
          setNewsEvents(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchNewsEvents();
    }, []);


  return (
    <section className={` w-full paddingvr flex flex-col gap-9 justify-between items-center`}>
      <h2 className={`text-[${Colors.primary}]`}>News & Updates</h2>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 w-full">
            
          {newsEvents.slice(0, 6).map((data) => (
            <CardNews 
              key={data.id} 
              image={data.image}  
              title={data.headline} 
              description={data.caption}  
              date={data.date}
              postDate={data.createdAt}
              id={data._id}
            />
          ))}
          {newsEvents.length > 6 && (
            <div className="col-span-2 md:col-span-3">
              <Link href={"/news"}>
                <h3 className={`w-full text-center bg-[${Colors.primary}] shadow text-white py-2 rounded`}>
                  View More
                </h3>
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
