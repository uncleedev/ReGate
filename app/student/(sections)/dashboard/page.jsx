
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import DashboardSection from './DashboardSection'

export default async function StudentDashboard() {


  const session = await auth()
  const user = session?.user

  if (!session || session?.user?.role !== 'student') {
    redirect("/student/signin")
  }

  return (
    <DashboardSection user={user} />
  )
}
