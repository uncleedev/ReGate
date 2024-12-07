import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import RequestsSection from './RequestsSection'

export default async function AdminRequestPage() {

    const session = await auth()

    if (!session || session?.user?.role !== 'admin') {
        redirect("/admin/signin")
    }

  return (
    <RequestsSection />
  )
}
