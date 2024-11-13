"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Navbar() {
  return (
    <nav className='menu__bar z-10'>
        <ul className='flex flex-col md:flex-row justify-between items-center'>
            <li>
                <Link className='link' href={""}>Portal ▼</Link>
                <div className='dropdown__menu'>
                    <ul>
                    <li><Link className='link' href={"/student/login"}>Student</Link></li>
                    <li><Link className='link' href={"/instructor/login"}>Instructor</Link></li>
                    </ul>
                </div>
            </li>

            <li><Link className='link' href={"/enrollment"}>Enrollment</Link></li>
            
            <li>
            <Link className='link' href={""}>Organizations ▼</Link>
                <div className='dropdown__menu'>
                    <ul>
                    <li><Link className='link' href={"/organizations/css"}>CSS</Link></li>
                    <li><Link className='link' href={""}>Sandbox</Link></li>
                    </ul>
                </div>
            </li>

            <li><Link className='link' href={"/"}><Image height={100} width={100} src={require("../../public/images/cdm-logo.png")} /></Link></li>

            <li>
                <Link className='link' href={""}>Administrations ▼</Link>
                <div className='dropdown__menu'>
                    <ul>
                    <li><Link className='link' href={""}>VVPA</Link></li>
                    <li><Link className='link' href={""}>Registrar</Link></li>
                    </ul>
                </div>
            </li>

            <li><Link className='link' href={"/programs"}>Programs</Link></li>

            <li><Link className='link' href={"/about"}>About</Link></li>
        </ul>
    </nav>
  )
}
