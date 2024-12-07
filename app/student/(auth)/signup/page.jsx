import React from 'react'
import StudentSignUpForm from './StudentSignupForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function StudentSignup() {

    const session = await auth()

    const user = session?.user

    if (user && user.role === 'student') redirect("/student/dashboard")
    if (user && user.role === 'admin') redirect("/admin/dashboard")
    if (user && user.role === 'instructor') redirect("/instructor/dashboard")

      
  return (
    <StudentSignUpForm />
  )
}
