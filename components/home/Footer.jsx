"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full bg-[#044721] text-white md:flex md:flex-col md:justify-center md:items-center paddingvr gap-3'>
        <div className='w-full flex flex-col md:flex-row  md:justify-between md:items-center gap-4'>
            <Image src={require("../../public/images/cdm-logo.png")} height={100} width={100}/>
            <div className='flex flex-col  gap-[10px]'>
                <h3 className='h3 font-semibold'>Follow On:</h3>
                <ul className='flex gap-2'>
                    <li><Link href={""}><Image height={30} width={30} src={require("../../public/icons/facebook.png")} /></Link></li>
                    <li><Link href={""}><Image height={30} width={30} src={require("../../public/icons/instagram.png")} /></Link></li>
                    <li><Link href={""}><Image height={30} width={30} src={require("../../public/icons/twitter.png")} /></Link></li>
                    <li><Link href={""}><Image height={30} width={30} src={require("../../public/icons/youtube.png")} /></Link></li>
                </ul>
            </div>

            <div className='flex flex-col  gap-[10px]'>
                <h3 className='h3 font-semibold'>Contact Us:</h3>
                <ul className=''>
                    <li><span className='font-bold'>Address: </span>Kasiglahan Village, San Jose</li>
                    <li><span className='font-bold'>Email: </span>colegiodemontalban@gmail.com</li>
                    <li><span className='font-bold'>Phone: </span>+63123456789</li>
                </ul>
            </div>
        
        </div>
        <h6 className='text-[12px] text-center'>2024 © Copyright <br />
        Managed and maintained by CDMMIS</h6>
    </footer>
  )
}
