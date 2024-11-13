import CardNews from '@/components/CardNews'
import HeroSection from '@/components/common/HeroSection'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import { Colors } from '@/constants/colors'
import { news } from '@/sample/data'
import Link from 'next/link'
import React from 'react'

export default function NewsPage() {
  return (
    <div className='w-full'>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 w-full">
            {news.map((data) => (
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
