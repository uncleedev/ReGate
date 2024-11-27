"use client"

import { Colors } from '@/constants/colors'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardNews({ title, date, description, image, id }) {
    const formatDate = new Date(date).toLocaleDateString()

    return (
        <div className='w-full shadow-md rounded-[10px] transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
            <Image className='rounded-t-[10px] w-full h-[156px] md:h-[312px]' height={512} width={300} src={image} alt={title} />
            <div className='w-full h-full flex flex-col p-4 gap-1'>
                <div className='w-full flex flex-col gap-2'>
                    <div>
                        <h3 className='h3'>{title}</h3>
                        <h4 className='h4'>{formatDate}</h4>
                    </div>
                    <p className='text-justify h-[50px] overflow-hidden opacity-60'>
                        {description}
                    </p>
                </div>
                <Link href={{ pathname: `/news/${id}` }}>
                    <h3 className={`p-2 shadow rounded hover:bg-[#044721] hover:text-white hover:border-none border-[${Colors.primary}] border-2 w-full text-center text-[#044721] font-semibold`}>
                        Read more
                    </h3>
                </Link>
            </div>
        </div>
    )
}