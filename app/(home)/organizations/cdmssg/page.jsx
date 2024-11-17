"use client"

import Image from 'next/image'
import React from 'react'

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { officersCDMSSG, officersCss } from '@/constants/officers';
export default function CdmssgPage() {
  return (
    <div className='px-[160px] flex flex-col gap-3 w-full h-full'>
      <div className='w-full h-[420px] relative'>
        <Image src={require("@/public/images/cdmssg/cdmssg-banner.jpg")} className='w-full h-full shadow'/>
        <Image src={require("@/public/images/cdmssg/cdmssg-logo.png")} className='h-[250px] w-[250px] rounded-full border border-black absolute bottom-[-110px] bg-white' />
      </div>
      <div className='ml-[262px] flex flex-col gap-3'>
          <h1 >Colegio de Montalban Supreme Student Government <span>(CDMSSG)</span></h1>
          <div className='flex flex-col gap-2'>

            <span className='text-gray-500 flex items-center gap-2'>

              <MdEmail size={24} />
              cdmssg.cdm.edu@gmail.com
            </span>

            <span className='text-gray-500 flex items-center gap-2'>

              <FaPhoneAlt size={24} />
              +631234567890
            </span>          
          </div>
      </div>
      <div className='grid grid-cols-5 w-full h-full mt-6'>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab dolores veniam voluptatum in culpa autem nihil vitae, rerum corrupti.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab dolores veniam voluptatum in culpa autem nihil vitae, rerum corrupti.</p>
        </div>
        <div className='col-span-3 h-full border-black border-x border-t p-4 text-justify '>
          <h3>Title</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam aperiam esse, corporis eum minus ipsa pariatur, harum hic inventore blanditiis voluptas dolorem, cum explicabo! Fugit voluptates, molestias placeat esse ipsam ab quaerat corrupti non rerum cupiditate fugiat tempore, quae id velit deserunt unde aliquid nihil adipisci necessitatibus. Voluptatibus dignissimos aliquid a, repellendus repellat veniam consequuntur ad fuga exercitationem? Nostrum aspernatur magnam labore. Sit, odio possimus adipisci veritatis laboriosam error velit numquam qui facilis facere? Expedita, rem nemo odio reiciendis quibusdam dolores voluptas nulla earum natus similique quisquam blanditiis aliquam illo eligendi tempore quod soluta? Suscipit magni eius voluptatibus sapiente velit.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam aperiam esse, corporis eum minus ipsa pariatur, harum hic inventore blanditiis voluptas dolorem, cum explicabo! Fugit voluptates, molestias placeat esse ipsam ab quaerat corrupti non rerum cupiditate fugiat tempore, quae id velit deserunt unde aliquid nihil adipisci necessitatibus. Voluptatibus dignissimos aliquid a, repellendus repellat veniam consequuntur ad fuga exercitationem? Nostrum aspernatur magnam labore. Sit, odio possimus adipisci veritatis laboriosam error velit numquam qui facilis facere? Expedita, rem nemo odio reiciendis quibusdam dolores voluptas nulla earum natus similique quisquam blanditiis aliquam illo eligendi tempore quod soluta? Suscipit magni eius voluptatibus sapiente velit.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam aperiam esse, corporis eum minus ipsa pariatur, harum hic inventore blanditiis voluptas dolorem, cum explicabo! Fugit voluptates, molestias placeat esse ipsam ab quaerat corrupti non rerum cupiditate fugiat tempore, quae id velit deserunt unde aliquid nihil adipisci necessitatibus. Voluptatibus dignissimos aliquid a, repellendus repellat veniam consequuntur ad fuga exercitationem? Nostrum aspernatur magnam labore. Sit, odio possimus adipisci veritatis laboriosam error velit numquam qui facilis facere? Expedita, rem nemo odio reiciendis quibusdam dolores voluptas nulla earum natus similique quisquam blanditiis aliquam illo eligendi tempore quod soluta? Suscipit magni eius voluptatibus sapiente velit.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam aperiam esse, corporis eum minus ipsa pariatur, harum hic inventore blanditiis voluptas dolorem, cum explicabo! Fugit voluptates, molestias placeat esse ipsam ab quaerat corrupti non rerum cupiditate fugiat tempore, quae id velit deserunt unde aliquid nihil adipisci necessitatibus. Voluptatibus dignissimos aliquid a, repellendus repellat veniam consequuntur ad fuga exercitationem? Nostrum aspernatur magnam labore. Sit, odio possimus adipisci veritatis laboriosam error velit numquam qui facilis facere? Expedita, rem nemo odio reiciendis quibusdam dolores voluptas nulla earum natus similique quisquam blanditiis aliquam illo eligendi tempore quod soluta? Suscipit magni eius voluptatibus sapiente velit.</p>
        </div>
        <div className='col-span-1 border-t border-black p-4 text-justify'>
          <h2>Others</h2>
        </div>
      </div>
      <div className='p-4 text-justify border-t border-black w-full'>
        <h2 className='text-center mb-3'>Officers</h2>
        <div className='grid grid-cols-5 gap-2'>
          {officersCDMSSG.map((officer) => (
            <Image src={officer.image} height={320} />
          ))}
        </div>
      </div>
    </div>
  )
}
