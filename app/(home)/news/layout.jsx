import CardNews from '@/components/CardNews'
import HeroSection from '@/components/common/HeroSection'
import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import { Colors } from '@/constants/colors'
import { news } from '@/sample/data'
import Link from 'next/link'
import React from 'react'

export default function NewsLayout({children}) {
  return (
    <div>
        <Navbar />
        <HeroSection heading={"News & Updates"} />
        <div className='w-full paddingvr grid grid-cols-5 gap-8 '>
            <div className='col-span-4 flex flex-col gap-9'>    
                {children}
                <div>
                    <h2 className='text-center mb-4'>Other News</h2>
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
                    </div>
                </div>
            </div>
            <div className='col-span-1 flex flex-col border-l-2 border-gray-400 items-center'>
                <h2>Latest News</h2>
                <ul className='ml-8 mt-3 flex flex-col gap-2'>
                    {news.map((data) => (
                        <li className='text-[18px] font-medium underline list-disc hover:text-gray-400'>
                            <Link href={{
                                pathname: `/news/${data.id}`,
                                query: {title: data.title, date: data.date, description: data.description, image: data.image}
                            }}>{data.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        <Footer />
    </div>
  )
}
