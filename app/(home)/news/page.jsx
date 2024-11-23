import CardNews from '@/components/CardNews'
import React, { useEffect, useState } from 'react'

export default function NewsPage() {

  const [newsEvents, setNewsEvents] = useState([])

  useEffect(() => {
    const fetchNewsEvens = async () => {
      try {
        const res = await fetch("/api/news-events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json()

        setNewsEvents(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  })

  return (
    <div className='w-full'>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 w-full">
            {newsEvents.map((data) => (
                <CardNews 
                    key={data.id} 
                    image={data.image}  
                    title={data.title} 
                    description={data.description}  
                    date={data.date}
                    id={data.id}
                />
            ))}
        </div>
    </div>
  )
}
