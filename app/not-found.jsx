import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex justify-center gap-6 items-center h-screen'>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <h1>Ooops... <br />Page Not Found!</h1>
                <p className='opacity-75'>The requested URL was not found on this server.</p>
            </div>

            <Link className='p-3 bg-[#044721] text-center text-white font-semibold text-lg rounded-md shadow-md' href={"/"}>Go Back</Link>
        </div>
        <Image src={require("@/public/images/not-found.svg")} />
    </div>
  )
}
