import React from 'react'
import ScheduleSection from './ScheduleSection'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function InstructorSchedulesPage() {

    const session = await auth()
    const user = session?.user

    if (!session || session?.user?.role !== 'instructor') {
        redirect("/instructor/signin")
    }

  return (
    <ScheduleSection user={user} />
  )
}
