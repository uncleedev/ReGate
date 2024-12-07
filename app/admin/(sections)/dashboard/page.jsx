import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import DashboardSection from './DashboardSection'

export default async function AdminDashboard() {
  const session = await auth()

  if (!session || session?.user?.role !== 'admin') {
    redirect("/admin/signin")
  }

  return (
      <DashboardSection />
  )
}