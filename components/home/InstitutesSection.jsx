"use client"

import { Colors } from '@/constants/colors'
import { institutes } from '@/constants/institutes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function InstitutesSection() {
  return (
    <section className={`bg-white w-full paddingvr py-10 flex flex-col gap-9 justify-between items-center`}>
        <h2 className={`text-[${Colors.primary}] text-2xl font-bold`}>Institutes</h2>
        <div className='w-full flex justify-around'>
            {institutes.map((data) => (
                <Link key={data.id} href={data.link} className='flex flex-col justify-center items-center gap-3'>
                    <Image src={data.image}  alt={data.name} width={200} height={200} />
                    <h3 className={`text-[${Colors.primary}] font-bold`}>{data.name}</h3>
                </Link>
            ))}
        </div>
    </section>
  )
}
