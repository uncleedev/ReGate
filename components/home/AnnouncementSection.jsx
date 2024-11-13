

import React from 'react'
import { Colors } from '@/constants/colors'
import SwiperAnnouncement from '../common/SwiperAnnouncement'

export default function AnnouncementSection() {
  return (
    <section className={`bg-white w-full paddingvr py-10 flex flex-col gap-9 justify-between items-center`}>
        <h2 className={`text-[${Colors.primary}] text-2xl font-bold`}>Announcement</h2>
        <SwiperAnnouncement />
    </section>
  )
}
