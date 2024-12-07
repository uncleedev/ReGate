import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import NewsEventSection from './NewsEventSection'

export default async function AdminNewsEventsPage() {

    const session = await auth()

    if (!session || session?.user?.role !== 'admin') {
        redirect("/admin/signin")
    }

  return (
    <NewsEventSection />
  )
}
