"use client"
import React from 'react'
import { Colors } from '@/constants/colors'
import { news } from '@/sample/data'
import CardNews from '@/components/CardNews'
import Link from 'next/link'

export default function NewsUpdateSection() {
  return (
    <section className={`bg-white w-full paddingvr flex flex-col gap-9 justify-between items-center`}>
      <h2 className={`text-[${Colors.primary}]`}>News & Updates</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 w-full">
        {news.slice(0, 6).map((data) => (
          <CardNews 
            key={data.id} 
            image={data.image}  
            title={data.title} 
            description={data.description}  
            date={data.date}
            id={data.id}
          />
        ))}
        {news.length > 6 && (
          <div className="col-span-2 md:col-span-3">
            <Link href={"/news"}><h3 className={`w-full text-center bg-[${Colors.primary}] shadow  text-white py-2 rounded`}>View More</h3></Link>
          </div>
        )}
      </div>
    </section>
  )
}
