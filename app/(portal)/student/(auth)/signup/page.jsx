import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import StudentSignUp from '@/components/portal/StudentSignup'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function StudentSignupPage() {


  const session = await getServerSession(authOptions)

  if (session) redirect("/student/dashboard")

  return <StudentSignUp />
}
