import React from 'react'
import RequestsSection from './RequestsSection'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function StudentRequestsPage() {

    const session = await auth()
    const user = session?.user

    if (!session || session?.user?.role !== 'student') {
        redirect("/student/signin")
    }

  return (
    <RequestsSection user={user} />
  )
}
