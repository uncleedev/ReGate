"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className='w-full px-[160px] hidden md:block pt-12 absolute top-0 z-30 text-white'>
        <ul className='menu'>
            <li className='menu__item relative group'>
                <Link href={"#"}>Portal ▼</Link>
                <ul className='dropdown__menu group-hover:block'>
                    <Link href={"/student/signin"}><li className='dropdown__item w-[200px]'>Student</li></Link>
                    <Link href={"/instructor/signin"}><li className='dropdown__item'>Instructor</li></Link>
                    <Link href={"/admin/signin"}> <li className='dropdown__item'>Admin</li></Link>
                </ul>
            </li>

            <li className='menu__item'><Link href={"/enrollment"}>Enrollment</Link></li>

            <li className='menu__item relative group'>
                <Link href={"#"}>Organizations ▼</Link>
                <ul className='dropdown__menu group-hover:block'>
                    <Link href={"/organizations/css"}><li className='dropdown__item w-[200px]'>CSS</li></Link>
                    <Link href={"/organizations/cdmssg"}><li className='dropdown__item'>CDMSSG</li></Link>
                    <Link href={"/organizations/sportsclub"}><li className='dropdown__item'>SPORTSCLUB</li></Link>
                    <Link href={"/organizations/ibesc"}><li className='dropdown__item'>IBESC</li></Link>
                    <Link href={"/organizations/educsociety"}><li className='dropdown__item'>EDUCSOCIETY</li></Link>
                    <Link href={"/organizations/sandbox"}><li className='dropdown__item'>SANDBOX</li></Link>
                </ul>
            </li>

            <li className='menu__item'>
                <Link href={"/"}>
                    <Image src={require("@/public/images/cdm-logo.png")} height={100} width={100}/>
                </Link>
            </li>

            <li className='menu__item relative group'>
                <Link href={"/administrations"}>Administrations ▼</Link>
                <ul className='dropdown__menu group-hover:block w-[500px]'>
                    <Link href={"/administrations/office-of-the-president"}><li className='dropdown__item'>Office of the President</li></Link>
                    <Link href={"/administrations/office-of-the-vice-president-for-administration"}><li className='dropdown__item '>Office of the Vice President for Administration</li></Link>
                    <Link href={"/administrations/office-of-the-vice-president-for-academic-affairs"}><li className='dropdown__item'>Office of the Vice President for Academic Affairs</li></Link>
                </ul>
            </li>

            <Link href={"/programs"}><li className='menu__item'>Programs</li></Link>

            <li className='menu__item relative group'>
                <Link href={""}>Services ▼</Link>
                <ul className='dropdown__menu group-hover:block w-[200px]'>
                    <Link href={"/news"}><li className='dropdown__item'>News and Events</li></Link>
                    <Link href={"/announcements"}><li className='dropdown__item'>Announcements</li></Link>
                    <Link href={"/about"}><li className='dropdown__item'>About</li></Link>
                   
                </ul>
            </li>
        </ul>
    </header>
  )
}

