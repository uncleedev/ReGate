

import React from 'react'
import { Colors } from '@/constants/colors'
import SwiperAnnouncement from './SwiperAnnouncement'


export default function AnnouncementSection() {
  return (
    <section className={`w-full h-[320px] md:h-[720px] paddingvr py-10 flex flex-col gap-9 justify-between items-center`}>
        <h2 className={`text-[${Colors.primary}] text-2xl font-bold`}>Announcement</h2>
        <SwiperAnnouncement />
    </section>
  )
}
