"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, Drawer, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => setIsOpen(true)
    const closeDrawer = () => setIsOpen(false)

  return (
    <>
        <header className='w-full px-6 md:px-[160px] hidden  md:block pt-6 md:pt-12 absolute top-0 z-30 text-white'>
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

                <li className='menu__item hidden md:block'>
                    <Link href={"/"}>
                        <Image src={require("@/public/images/cdm-logo.png")} height={100} width={100}/>
                    </Link>
                </li>

                <li className='menu__item relative group'>
                    <Link href={"#"}>Administrations ▼</Link>
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

        <header className=' md:hidden bg-[#044721] flex justify-between fixed w-full p-6 items-center h-8'>
            <div className='flex justify-center items-center gap-2 text-white'>
                <Image src={require("@/public/images/cdm-logo.png")} height={32} width={32}/>
                <h1>CDM</h1>
            </div>
            <button onClick={openDrawer}>
                <GiHamburgerMenu size={24} color='white'/>
            </button>
            
       
        </header>

        <Drawer
            placement='right'
            open={isOpen}
            onClose={closeDrawer}
        >
            <div className='p-2'>

                <button onClick={closeDrawer}>
                    <IoMdClose size={24}/>
                </button>

                <div className='w-full'>
                    <Menu>
                        <MenuHandler>
                            <Button className='w-full'>Portals</Button>
                        </MenuHandler>
                        <MenuList className='z-30'>
                            <MenuItem>
                                <Link href={"#"}>Student</Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </Drawer>
    </>
  )
}

