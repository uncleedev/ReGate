import React from 'react'
import GradesSection from './GradesSection'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function StudentGradesPage() {

  const session = await auth()
  const user = session?.user

  if (!session || session?.user?.role !== 'student') {
    redirect("/student/signin")
  }


  return (
    <GradesSection user={user} />
  )
}
