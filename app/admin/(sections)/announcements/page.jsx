import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import AnnouncementSection from './AnnouncementSection'

export default async function AdminAnnouncementPage() {

    const session = await auth()

    if (!session || session?.user?.role !== 'admin') {
        redirect("/admin/signin")
    }
  return (
    <AnnouncementSection />
  )
}
