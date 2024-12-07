"use client"

import { Drawer } from '@material-tailwind/react'
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MenuDrawer() {

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => setIsOpen(true)
    const closeDrawer = () => setIsOpen(false)

  return (
    <>
        <button onClick={openDrawer}>
            <GiHamburgerMenu size={24}/>
        </button>
        <Drawer
            placement='right'
            open={isOpen}
            onClose={closeDrawer}
        >
            <div className='p-2'>

                <button onClick={closeDrawer}>
                    <IoMdClose size={24}/>
                </button>
            </div>
        </Drawer>
    
    </>
  )
}
