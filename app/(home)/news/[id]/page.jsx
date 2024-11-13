"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function NewsIdPage() {
  
  const searcParams = useSearchParams()

  const image = searcParams.get("image")


  return (
    <div className="w-full">
        <Image 
          src={require(`@/public/images/announcement.jpg`)}
          className="w-full h-[520px]"
        />
        <h2 className='mt-6'>{searcParams.get("title")}</h2>
        <h4 className="mt-2">{searcParams.get("date")}</h4>
        <p className="mt-4 text-justify">{searcParams.get("description")}</p>
    </div>
    
  )
}
